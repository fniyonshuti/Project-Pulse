import React, { useState, useEffect } from "react";

interface HeroProps {
  onCTAClick: () => void;
}

interface Project {
  project_id?: number;
  name: string;
  description: string;
  status: string;
}

export const Hero: React.FC<HeroProps> = ({ onCTAClick }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setFadeIn(true);

    const fetchProjects = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/projects");
        if (!res.ok) throw new Error("Failed to fetch projects");

        const data = await res.json();
        setProjects(data);
      } catch (err: any) {
        setError(err.message || "Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="relative overflow-hidden">
      {/* HERO BACKGROUND */}
      <div
        className="relative h-screen"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1521790945508-bf2a36314e85')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center items-center text-center">
          <div
            className={`transition-all duration-[1400ms] ease-out ${
              fadeIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <h1 className="text-5xl sm:text-6xl font-extrabold mb-6 drop-shadow-xl leading-tight text-white">
              Manage Projects. <br /> Boost Productivity.
            </h1>

            <p className="text-lg sm:text-2xl text-gray-200 mb-10 max-w-3xl mx-auto leading-relaxed drop-shadow">
              Project Pulse helps teams track, analyze, and manage work
              effortlessly — all powered by real-time project data.
            </p>

            {loading ? (
              <p className="text-gray-300 mb-6 animate-pulse">
                Loading project stats...
              </p>
            ) : error ? (
              <p className="text-red-300 mb-6">{error}</p>
            ) : (
              <p className="text-lg font-semibold text-blue-100 mb-6 drop-shadow">
                📊 Total Projects:{" "}
                <span className="font-bold text-white">{projects.length}</span>
              </p>
            )}

            {/* HERO CTA */}
            <div className="flex justify-center gap-5">
              <button
                onClick={onCTAClick}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-10 rounded-xl text-lg shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all"
              >
                Get Started
              </button>

              <button
                onClick={() =>
                  window.scrollTo({ top: 900, behavior: "smooth" })
                }
                className="bg-white/20 backdrop-blur-lg border border-white/30 text-white font-semibold py-3 px-10 rounded-xl text-lg hover:bg-white/30 hover:shadow-xl hover:-translate-y-1 transition-all"
              >
                Explore Projects
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* FEATURED PROJECTS */}
      {!loading && !error && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid md:grid-cols-3 gap-8">
          {projects.slice(0, 3).map((project, idx) => {
            const statusColor =
              project.status === "Completed"
                ? "bg-green-100 text-green-800 border-green-300"
                : project.status === "In Progress"
                ? "bg-yellow-100 text-yellow-800 border-yellow-300"
                : "bg-gray-100 text-gray-700 border-gray-300";

            return (
              <div
                key={idx}
                className="bg-white/95 backdrop-blur-lg p-6 rounded-3xl shadow-lg border border-gray-200 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Card Header */}
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold text-gray-900">
                    {project.name}
                  </h3>
                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full border ${statusColor}`}
                  >
                    {project.status}
                  </span>
                </div>

                {/* Description */}
                <p className="text-gray-700 text-sm mb-6 line-clamp-3">
                  {project.description}
                </p>

                {/* Footer with action */}
                <button className="mt-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-xl shadow hover:shadow-lg transition-all text-sm">
                  View Details
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* =================== CALL TO ACTION SECTION =================== */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 py-24 text-center text-white">
        <h2 className="text-4xl font-bold mb-6 drop-shadow-lg">
          Ready to take control of your projects?
        </h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          Sign up today and boost your team's productivity with real-time
          project tracking.
        </p>
        <button
          onClick={onCTAClick}
          className="bg-white text-blue-700 font-bold py-3 px-12 rounded-xl text-lg shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all"
        >
          Get Started Now
        </button>
      </div>

      {/* =================== CONTACT SECTION =================== */}
      <div className="bg-gray-100 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Contact Us</h2>
          <p className="text-gray-700 mb-8 max-w-2xl mx-auto">
            Have questions or want to learn more about Project Pulse? Reach out
            and we’ll get back to you as soon as possible.
          </p>

          <form className="grid gap-4 sm:grid-cols-2">
            <input
              type="text"
              placeholder="Your Name"
              className="p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:outline-none"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:outline-none"
            />
            <textarea
              placeholder="Your Message"
              className="sm:col-span-2 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:outline-none"
              rows={4}
            ></textarea>
            <button
              type="submit"
              className="sm:col-span-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-10 rounded-xl text-lg transition-all shadow-lg hover:shadow-2xl hover:-translate-y-1"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
