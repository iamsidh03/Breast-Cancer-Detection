export default function ResultCard({ result }) {
  const isMalignant = result.prediction === "Malignant";
  const confidence = (result.confidence * 100).toFixed(2);

  return (
    <div className="mt-6 bg-white border rounded-2xl p-6 shadow-md text-center">

      {/* RESULT STATUS */}
      <div className="mb-4">
        <h2
          className={`text-2xl font-bold ${
            isMalignant ? "text-red-600" : "text-green-600"
          }`}
        >
          {isMalignant ? "⚠️ Malignant Detected" : "✅ Benign"}
        </h2>

        <p className="text-sm text-slate-500 mt-1">
          AI Diagnosis Result
        </p>
      </div>

      {/* CONFIDENCE BAR */}
      <div className="mb-4">
        <p className="text-sm text-slate-600 mb-1">
          Confidence Level
        </p>

        <div className="w-full bg-slate-200 h-2 rounded-full">
          <div
            className={`h-2 rounded-full ${
              isMalignant ? "bg-red-500" : "bg-green-500"
            }`}
            style={{ width: `${confidence}%` }}
          />
        </div>

        <p className="text-xs text-slate-500 mt-1">
          {confidence}%
        </p>
      </div>

      {/* MODEL INFO */}
      <div className="text-sm text-slate-500">
        Model Used: <span className="font-medium text-slate-700">{result.model.toUpperCase()}</span>
      </div>

    </div>
  );
}