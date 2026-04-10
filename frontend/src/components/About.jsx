import { Activity, ShieldCheck, FileImage, CheckCircle2 } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* LEFT CONTENT */}
          <div>
            <h2 className="text-sm font-bold tracking-widest text-teal-600 uppercase mb-3">
              The Technology
            </h2>

            <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 leading-tight">
              Powered by Deep Learning (CNN)
            </h3>

            <p className="text-lg text-slate-600 mb-6 leading-relaxed">
              Early detection remains the most effective strategy for treating breast cancer.
              Our system uses advanced convolutional neural networks trained on
              histopathological datasets to provide fast and reliable predictions.
            </p>

            {/* FEATURES */}
            <div className="space-y-6 mt-8">

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center">
                  <Activity className="h-6 w-6 text-teal-600" />
                </div>

                <div>
                  <h4 className="text-xl font-semibold text-slate-900 mb-1">
                    High Accuracy
                  </h4>
                  <p className="text-slate-600">
                    Multiple CNN models trained with high validation accuracy.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center">
                  <ShieldCheck className="h-6 w-6 text-teal-600" />
                </div>

                <div>
                  <h4 className="text-xl font-semibold text-slate-900 mb-1">
                    Secure & Private
                  </h4>
                  <p className="text-slate-600">
                    Images are processed securely and not stored permanently.
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* RIGHT SIDE (ARCHITECTURE UI) */}
          <div className="relative">

            <div className="absolute inset-0 bg-gradient-to-tr from-teal-100 to-blue-50 rotate-3 rounded-3xl -z-10"></div>

            <div className="bg-white border border-slate-100 shadow-xl rounded-3xl p-8">

              <div className="flex flex-col space-y-4">

                {/* INPUT */}
                <div className="bg-slate-50 border p-4 rounded-xl flex items-center gap-4">
                  <FileImage className="text-slate-400 h-8 w-8" />
                  <div>
                    <p className="font-semibold">Input Image</p>
                    <p className="text-xs text-slate-500">Histopathology Scan</p>
                  </div>
                </div>

                <div className="flex justify-center">
                  <Activity className="text-teal-400 animate-pulse" />
                </div>

                {/* MODEL */}
                <div className="bg-teal-600 p-4 rounded-xl text-white flex items-center gap-4">
                  <div className="grid grid-cols-3 gap-1 w-12 h-12">
                    {[...Array(9)].map((_, i) => (
                      <div key={i} className="bg-teal-300 rounded-sm"></div>
                    ))}
                  </div>

                  <div>
                    <p className="font-semibold">CNN Model</p>
                    <p className="text-xs text-teal-100">Feature Extraction</p>
                  </div>
                </div>

                <div className="flex justify-center">
                  <Activity className="text-teal-400 animate-pulse" />
                </div>

                {/* OUTPUT */}
                <div className="bg-slate-50 border p-4 rounded-xl flex items-center gap-4">
                  <CheckCircle2 className="text-teal-500 h-8 w-8" />
                  <div>
                    <p className="font-semibold">Prediction</p>
                    <p className="text-xs text-slate-500">Benign / Malignant</p>
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}