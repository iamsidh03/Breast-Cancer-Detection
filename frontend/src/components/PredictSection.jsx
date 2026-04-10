import { useState } from "react";
import axios from "axios";

import ModeSelector from "./ModeSelector";
import UploadBox from "./UploadBox";
import ResultCard from "./ResultCard";
import AdvancedResults from "./AdvancedResults";
import PDFDownload from "./PDFDownload";
// const API_URL = import.meta.env.VITE_API_URL ||"http://127.0.0.1:8000" ;
const API_URL = import.meta.env.VITE_API_URL;
console.log("ENV:", import.meta.env);
console.log("API:", import.meta.env.VITE_API_URL);
export default function PredictSection() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [advancedResult, setAdvancedResult] = useState(null);
  const [pdf, setPdf] = useState(null);

  const [mode, setMode] = useState("default");
  const [model, setModel] = useState("advanced");

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
    setResult(null);
    setAdvancedResult(null);
  };

  const handleUpload = async () => {
    if (!image) return alert("Upload image");

    const formData = new FormData();
    formData.append("file", image);

    const selectedModel = mode === "default" ? "default" : model;

    try {
      setLoading(true);
      console.log("API URL:", API_URL);
      const res = await axios.post(
        `${API_URL}/predict?model=${selectedModel}`,
        formData
      );

      if (res.data.error) {
        alert(res.data.error);
        return;
      }

      if (selectedModel === "advanced") {
        setAdvancedResult(res.data.results);
        setPdf(res.data.pdf);
      } else {
        setResult(res.data);
      }

    } catch (err) {
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-900 p-6 rounded-xl w-full max-w-md space-y-4 shadow-xl">

      <ModeSelector
        mode={mode}
        setMode={setMode}
        model={model}
        setModel={setModel}
      />

      <UploadBox handleChange={handleChange} preview={preview} />

      <button
        onClick={handleUpload}
        className="bg-blue-600 w-full py-2 rounded-lg hover:bg-blue-700"
      >
        {loading ? "Analyzing..." : "Predict"}
      </button>

      {result && <ResultCard result={result} />}

      {advancedResult && (
        <>
          <AdvancedResults results={advancedResult} />
          <PDFDownload pdf={pdf} />
        </>
      )}
    </div>
  );
}