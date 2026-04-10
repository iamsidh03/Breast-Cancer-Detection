import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Project from "./components/Project";
import Team from "./components/Team";
function App() {
  return (
    <div className="bg-slate-50 min-h-screen">
      <Navbar />
      <Hero />
       <About />
       <Project />
       <Team/>
    </div>
  );
}

export default App;