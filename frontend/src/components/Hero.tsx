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
    <div
      className="relative overflow-hidden"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1521790945508-bf2a36314e85')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div
          className={`
            py-24 text-center text-white transition-all duration-[1400ms] ease-out
            ${fadeIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
          `}
        >
          <h1 className="text-5xl sm:text-6xl font-extrabold mb-6 drop-shadow-lg">
            Project Pulse
          </h1>

          <p className="text-xl sm:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed drop-shadow">
            A lightweight project management tool powered by real-time project
            data.
          </p>

          {/* Display total projects */}
          {loading ? (
            <p className="text-gray-300 mb-4">Loading project data...</p>
          ) : error ? (
            <p className="text-red-300 mb-4">{error}</p>
          ) : (
            <p className="text-lg font-semibold text-blue-100 mb-4">
              Total Projects: {projects.length}
            </p>
          )}

          <button
            onClick={onCTAClick}
            className="
              bg-gradient-to-r from-blue-600 to-blue-700
              hover:from-blue-700 hover:to-blue-800
              text-white font-bold py-3 px-10 rounded-xl text-lg
              transition-all shadow-lg hover:shadow-2xl hover:-translate-y-1
            "
          >
            Go to Dashboard
          </button>
        </div>

        {/* Featured Project Cards */}
        {!loading && !error && (
          <div
            className={`
              grid md:grid-cols-3 gap-8 py-20
              transition-all duration-[1500ms] ease-out
              ${fadeIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
            `}
          >
            {projects.slice(0, 3).map((project, idx) => {
              const statusColor =
                project.status === "Completed"
                  ? "bg-green-100 text-green-700 border-green-300"
                  : project.status === "In Progress"
                  ? "bg-yellow-100 text-yellow-700 border-yellow-300"
                  : "bg-gray-100 text-gray-700 border-gray-300";

              return (
                <div
                  key={idx}
                  className="
                    bg-white/90 backdrop-blur-xl p-8 rounded-2xl
                    shadow-xl border border-white/40
                    hover:shadow-2xl hover:-translate-y-2
                    transition-all duration-300
                  "
                >
                  <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                    {project.name}
                  </h3>

                  <p className="text-gray-700 mb-4 leading-relaxed text-[15px]">
                    {project.description}
                  </p>

                  <span
                    className={`text-sm font-medium px-3 py-1 rounded-full border ${statusColor}`}
                  >
                    {project.status}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
