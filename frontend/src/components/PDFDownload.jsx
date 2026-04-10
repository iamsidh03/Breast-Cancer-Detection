export default function PDFDownload({ pdf }) {
  return (
    <div className="mt-6 text-center">

      <a
        href={`${pdf}`}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-2 bg-teal-600 text-white px-6 py-3 rounded-full font-medium shadow-md hover:bg-teal-700 hover:shadow-lg transition transform hover:-translate-y-0.5"
      >
         Download Full Report
      </a>

      <p className="text-xs text-slate-500 mt-2">
        Includes model comparison, confidence analysis & insights
      </p>

    </div>
  );
}