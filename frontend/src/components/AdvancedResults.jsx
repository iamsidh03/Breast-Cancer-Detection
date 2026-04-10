export default function AdvancedResults({ results }) {
  const best = results.reduce((a, b) =>
    a.confidence > b.confidence ? a : b
  );

  return (
    <div className="mt-6 bg-white border rounded-2xl p-6 shadow-md">

      {/* HEADER */}
      <h2 className="text-xl font-bold text-slate-900 mb-4">
        Model Comparison
      </h2>

      {/* TABLE */}
      <div className="space-y-4">
        {results.map((r, i) => {
          const confidence = (r.confidence * 100).toFixed(2);
          const isBest = r.model === best.model;
          const isMalignant = r.prediction === "Malignant";

          return (
            <div
              key={i}
              className={`p-4 rounded-xl border ${
                isBest
                  ? "border-green-500 bg-green-50"
                  : "border-slate-200"
              }`}
            >
              {/* TOP ROW */}
              <div className="flex justify-between items-center mb-2">
                <p className="font-semibold text-slate-800">
                  {r.model.toUpperCase()}
                </p>

                <p
                  className={`text-sm font-medium ${
                    isMalignant
                      ? "text-red-600"
                      : "text-green-600"
                  }`}
                >
                  {isMalignant ? "Malignant" : "Benign"}
                </p>
              </div>

              {/* CONFIDENCE BAR */}
              <div className="w-full bg-slate-200 h-2 rounded-full">
                <div
                  className={`h-2 rounded-full ${
                    isMalignant ? "bg-red-500" : "bg-green-500"
                  }`}
                  style={{ width: `${confidence}%` }}
                />
              </div>

              <p className="text-xs text-slate-500 mt-1">
                Confidence: {confidence}%
              </p>

              {/* BEST BADGE */}
              {isBest && (
                <p className="text-xs text-green-600 mt-2 font-medium">
                  🏆 Best Performing Model
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* FINAL SUMMARY */}
      <div className="mt-6 p-4 bg-slate-50 rounded-xl text-center">
        <p className="text-sm text-slate-500">Final Decision</p>
        <p className="text-lg font-bold text-slate-900">
          {best.prediction} ({(best.confidence * 100).toFixed(2)}%)
        </p>
      </div>
    </div>
  );
}