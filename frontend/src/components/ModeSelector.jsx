export default function ModeSelector({ mode, setMode, model, setModel }) {
  return (
    <div className="space-y-4">

      {/*  MODE TOGGLE */}
      <div className="bg-slate-100 p-1 rounded-xl flex">
        <button
          onClick={() => setMode("default")}
          className={`flex-1 py-2 rounded-lg text-sm font-medium transition ${
            mode === "default"
              ? "bg-white shadow text-slate-900"
              : "text-slate-500"
          }`}
        >
          Default
        </button>

        <button
          onClick={() => setMode("advanced")}
          className={`flex-1 py-2 rounded-lg text-sm font-medium transition ${
            mode === "advanced"
              ? "bg-white shadow text-slate-900"
              : "text-slate-500"
          }`}
        >
          Advanced
        </button>
      </div>

      {/*  MODEL SELECT (ONLY IN ADVANCED) */}
      {mode === "advanced" && (
        <div>
          <label className="block text-sm text-slate-500 mb-1">
            Select Model
          </label>

          <select
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="w-full border border-slate-300 rounded-lg p-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value="advanced">Run All Models</option>
            <option value="resnet">ResNet50</option>
            <option value="densenet">DenseNet121</option>
            <option value="mobilenet">MobileNetV2</option>
            <option value="efficientnet">EfficientNet</option>
          </select>
        </div>
      )}
    </div>
  );
}