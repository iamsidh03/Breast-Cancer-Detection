import { ShieldCheck } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="home"
      className="pt-40 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center text-center relative"
    >
      {/* BACKGROUND GLOW */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-teal-100/50 rounded-full blur-3xl -z-10"></div>

      {/* BADGE */}
      <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-white text-teal-700 font-semibold text-sm border border-teal-100 shadow-sm">
        <ShieldCheck className="h-4 w-4 text-teal-600" />
        <span>Next-Gen Diagnostic AI</span>
      </div>

      {/* TITLE */}
      <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-6 leading-tight">
        Precision Detection.
        <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-cyan-500">
          Empowered Healthcare.
        </span>
      </h1>

      {/* DESCRIPTION */}
      <p className="mt-4 max-w-2xl text-lg md:text-xl text-slate-500 mb-10 leading-relaxed">
        Leveraging advanced Deep Learning to analyze histopathological images.
        Get rapid, highly-accurate insights to assist medical professionals in
        early breast cancer diagnosis.
      </p>

      {/* BUTTONS */}
      <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
        <a
          href="#workspace"
          className="bg-teal-600 text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-teal-700 transition shadow-xl hover:shadow-teal-600/30 transform hover:-translate-y-1"
        >
          Launch Workspace
        </a>

        <a
          href="#about"
          className="bg-white text-slate-700 border border-slate-200 px-8 py-4 rounded-full text-lg font-medium hover:bg-slate-50 transition shadow-sm"
        >
          View Research
        </a>
      </div>
    </section>
  );
}