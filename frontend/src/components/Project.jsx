import {
  UploadCloud,
  Activity,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { useState, useRef } from "react";

import ModeSelector from "./ModeSelector";
import AdvancedResults from "./AdvancedResults";
import PDFDownload from "./PDFDownload";
import ResultCard from "./ResultCard";

export default function Project() {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [analysisStatus, setAnalysisStatus] = useState("idle");

  //  NEW STATES
  const [result, setResult] = useState(null);
  const [advancedResult, setAdvancedResult] = useState(null);
  const [pdf, setPdf] = useState(null);

  const [mode, setMode] = useState("default");
  const [model, setModel] = useState("advanced");

  const inputRef = useRef(null);

  // -------------------------------
  // DRAG HANDLERS
  // -------------------------------
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };


  // MAIN BACKEND FUNCTION
  
  const processFile = async (file) => {
    if (!file) return;

    setSelectedFile(file);
    setAnalysisStatus("analyzing");

    const formData = new FormData();
    formData.append("file", file);

    const selectedModel = mode === "default" ? "default" : model;

    try {
      const res = await fetch(
        `http://127.0.0.1:8000/predict?model=${selectedModel}`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();

      if (data.error) {
        alert(data.error);
        setAnalysisStatus("idle");
        return;
      }

      // DEFAULT
      if (selectedModel === "default") {
        setResult(data);
      }

      // ADVANCED
      else if (selectedModel === "advanced") {
        setAdvancedResult(data.results);
        setPdf(data.pdf);
      }

      // SINGLE MODEL
      else {
        setResult(data);
      }

      setAnalysisStatus("complete");

    } catch (err) {
      console.error(err);
      alert("Server error");
      setAnalysisStatus("idle");
    }
  };

  // -------------------------------
  // RESET
  // -------------------------------
  const reset = () => {
    setAnalysisStatus("idle");
    setResult(null);
    setAdvancedResult(null);
    setPdf(null);
    setSelectedFile(null);
  };

  return (
    <section id="workspace" className="py-24 bg-slate-50">
      <div className="max-w-4xl mx-auto px-4">

        {/* TITLE */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Diagnostic Workspace
          </h2>
          <p className="text-slate-600">
            Upload a histopathology image to analyze
          </p>
        </div>

        {/* CARD */}
        <div className="bg-white rounded-3xl shadow-xl border overflow-hidden">

          {/* HEADER */}
          <div className="bg-slate-900 px-6 py-4 flex justify-between items-center">
            <div className="flex gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <span className="text-slate-400 text-sm">
              oncodel-ai-v1
            </span>
          </div>

          {/* BODY */}
          <div className="p-8 space-y-6">

            {/*  MODE SELECTOR */}
            <ModeSelector
              mode={mode}
              setMode={setMode}
              model={model}
              setModel={setModel}
            />

            {/* STATE 1 — UPLOAD */}
            {analysisStatus === "idle" && (
              <div
                className={`border-2 border-dashed p-12 rounded-2xl text-center cursor-pointer ${
                  dragActive
                    ? "border-teal-500 bg-teal-50"
                    : "border-slate-300"
                }`}
                onClick={() => inputRef.current.click()}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  ref={inputRef}
                  type="file"
                  className="hidden"
                  onChange={(e) => processFile(e.target.files[0])}
                />

                <UploadCloud className="mx-auto h-16 text-slate-400 mb-4" />
                <h3 className="font-semibold text-lg">
                  Drag & Drop Image
                </h3>
                <p className="text-slate-500 mb-4">
                  or click to upload
                </p>
              </div>
            )}

            {/* STATE 2 — LOADING */}
            {analysisStatus === "analyzing" && (
              <div className="text-center py-12">
                <Activity className="mx-auto text-teal-600 animate-spin mb-4" />
                <h3 className="text-xl font-bold">Analyzing...</h3>
              </div>
            )}

            {/* STATE 3 — RESULT */}
            {analysisStatus === "complete" && (
              <div className="text-center py-6">

                <CheckCircle2 className="mx-auto text-green-500 mb-4" />
                <h3 className="text-xl font-bold mb-6">
                  Analysis Complete
                </h3>

                {/* DEFAULT RESULT */}
                {result && <ResultCard result={result} />}

                {/* ADVANCED RESULT */}
                {advancedResult && (
                  <>
                    <AdvancedResults results={advancedResult} />
                    <PDFDownload pdf={pdf} />
                  </>
                )}

                <button
                  onClick={reset}
                  className="mt-6 bg-teal-600 text-white px-6 py-2 rounded-full"
                >
                  Analyze New
                </button>
              </div>
            )}

          </div>

          {/* FOOTER */}
          <div className="bg-amber-50 px-6 py-4 flex gap-2 text-sm">
            <AlertCircle className="text-amber-600" />
            <p>
              This is for research only. Not a medical diagnosis.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}