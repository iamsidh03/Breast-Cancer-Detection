export default function Team() {
  const team = [
    {
      name: "Siddharth Raj",
      role: "Backend,Model Training",
      desc: "Designed and trained deep learning models and Backend system",
    },
    {
      name: "Rohit Yadav",
      role: "Backend,Model Training",
      desc: "handled model deployment and Designed and trained deep learning models",
    },
    {
      name: "Akashdeep verma",
      role: "Frontend Developer",
      desc: "Built responsive UI using React and Tailwind CSS.",
    },
    // {
    //   name: "Member 4",
    //   role: "ML Engineer",
    //   desc: "Worked on data preprocessing and model evaluation.",
    // },
    // {
    //   name: "Member 5",
    //   role: "Research & Testing",
    //   desc: "Performed testing and research on model accuracy.",
    // },
  ];

  return (
    <section id="team" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 text-center">

        {/* HEADER */}
        <h2 className="text-sm font-bold tracking-widest text-teal-600 uppercase mb-3">
          Project Members
        </h2>

        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-16">
          Meet the Developers
        </h2>

        {/* GRID */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">

          {team.map((member, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl p-8 border border-slate-200 
              shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
            >
              {/* AVATAR */}
              <div className="w-24 h-24 bg-slate-100 rounded-full mx-auto mb-6 
              flex items-center justify-center shadow text-3xl">
                👤
              </div>

              {/* NAME */}
              <h3 className="text-xl font-bold text-slate-900">
                {member.name}
              </h3>

              {/* ROLE */}
              <p className="text-teal-600 font-medium mb-3 text-sm">
                {member.role}
              </p>

              {/* DESC */}
              <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                {member.desc}
              </p>

              {/* SOCIAL LINKS (TEXT BASED) */}
              <div className="flex justify-center gap-6 text-sm font-medium">

                <a
                  href="#"
                  className="text-slate-400 hover:text-black transition"
                >
                  GitHub
                </a>

                <a
                  href="#"
                  className="text-slate-400 hover:text-blue-600 transition"
                >
                  LinkedIn
                </a>

              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}