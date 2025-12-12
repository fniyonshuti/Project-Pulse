import React, { useState, useEffect } from "react";
import { submitContact, getContacts, type ContactFormData, type ContactResponse } from "../services/contactService";
import { MessageSquare, User, Calendar } from "lucide-react";

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
  
  // Contact form state
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [contactLoading, setContactLoading] = useState(false);
  const [contactError, setContactError] = useState("");
  const [contactSuccess, setContactSuccess] = useState("");
  const [contactSubmissions, setContactSubmissions] = useState<ContactResponse[]>([]);
  const [contactsLoading, setContactsLoading] = useState(false);

  useEffect(() => {
    setFadeIn(true);

    const fetchProjects = async () => {
      try {
        const APIurl = import.meta.env.VITE_API_URL || "http://localhost:8000/api";
        const res = await fetch(`${APIurl}/projects`);
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
    
    // Fetch contact submissions
    const fetchContacts = async () => {
      setContactsLoading(true);
      try {
        const contacts = await getContacts(0, 6); // Get latest 6 contacts
        setContactSubmissions(contacts);
      } catch (err) {
        console.error("Error fetching contacts:", err);
      } finally {
        setContactsLoading(false);
      }
    };
    
    fetchContacts();
  }, []);

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setContactLoading(true);
    setContactError("");
    setContactSuccess("");

    try {
      const contactData: ContactFormData = {
        name: contactForm.name.trim(),
        email: contactForm.email.trim(),
        message: contactForm.message.trim(),
      };

      await submitContact(contactData);

      setContactSuccess("Thank you! Your message has been sent successfully. We'll get back to you soon.");
      setContactForm({ name: "", email: "", message: "" });
      
      // Refresh contact submissions to show the new one
      const contacts = await getContacts(0, 6);
      setContactSubmissions(contacts);
    } catch (err: any) {
      console.error("Contact submission error:", err);
      setContactError(
        err.message || "An error occurred. Please try again later."
      );
    } finally {
      setContactLoading(false);
    }
  };

  const handleContactChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setContactForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

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
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold mb-6 drop-shadow-2xl leading-tight text-white">
              Manage Projects. <br /> 
              <span className="bg-gradient-to-r from-blue-300 to-blue-100 bg-clip-text text-transparent">
                Boost Productivity.
              </span>
            </h1>

            <p className="text-xl sm:text-2xl text-gray-100 mb-10 max-w-3xl mx-auto leading-relaxed drop-shadow-lg font-medium">
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
                 Total Projects:{" "}
                <span className="font-bold text-white">{projects.length}</span>
              </p>
            )}

            {/* HERO CTA */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-5">
              <button
                onClick={onCTAClick}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-4 px-10 rounded-xl text-lg shadow-2xl hover:shadow-3xl hover:-translate-y-1 transition-all duration-300 transform hover:scale-105 w-full sm:w-auto"
              >
                Get Started Free
              </button>

              <button
                onClick={() =>
                  window.scrollTo({ top: 900, behavior: "smooth" })
                }
                className="bg-white/10 backdrop-blur-md border-2 border-white/40 text-white font-semibold py-4 px-10 rounded-xl text-lg hover:bg-white/20 hover:border-white/60 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto"
              >
                Explore Projects
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* FEATURED PROJECTS */}
      {!loading && !error && projects.length > 0 && (
        <div className="bg-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Projects</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Explore our latest projects and see how we're helping teams achieve their goals
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
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
                    className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-2xl shadow-lg border border-gray-200 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between group"
                  >
                    {/* Card Header */}
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition">
                        {project.name}
                      </h3>
                      <span
                        className={`text-xs font-semibold px-3 py-1 rounded-full border ${statusColor}`}
                      >
                        {project.status}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 text-sm mb-6 line-clamp-3 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Footer with action */}
                    {/* <button className="mt-auto bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-2.5 px-6 rounded-xl shadow-md hover:shadow-lg transition-all text-sm w-full">
                      View Details
                    </button> */}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* =================== CONTACT TESTIMONIALS SECTION =================== */}
      {contactSubmissions.length > 0 && (
        <div className="bg-gradient-to-br from-gray-50 to-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <MessageSquare className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">What People Are Saying</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                See what our users have to say about Project Pulse
              </p>
            </div>
            
            {contactsLoading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <p className="mt-4 text-gray-600">Loading messages...</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {contactSubmissions.map((contact) => {
                  const date = new Date(contact.created_at);
                  const formattedDate = date.toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric', 
                    year: 'numeric' 
                  });
                  
                  return (
                    <div
                      key={contact.id}
                      className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl border border-gray-100 transition-all duration-300 hover:-translate-y-1 group"
                    >
                      <div className="flex items-start gap-4 mb-4">
                        <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">
                          {contact.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition">
                            {contact.name}
                          </h4>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <Calendar className="w-3 h-3" />
                            <span>{formattedDate}</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-700 text-sm leading-relaxed line-clamp-4">
                        "{contact.message}"
                      </p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* =================== CALL TO ACTION SECTION =================== */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 py-24 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 drop-shadow-lg">
            Ready to take control of your projects?
          </h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto text-blue-100">
            Sign up today and boost your team's productivity with real-time
            project tracking.
          </p>
          <button
            onClick={onCTAClick}
            className="bg-white text-blue-700 font-bold py-4 px-12 rounded-xl text-lg shadow-2xl hover:shadow-3xl hover:-translate-y-1 transition-all duration-300 transform hover:scale-105"
          >
            Get Started Now
          </button>
        </div>
      </div>

      {/* =================== CONTACT SECTION =================== */}
      <div className="bg-gradient-to-br from-white via-gray-50 to-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <User className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Get In Touch</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Have questions or want to learn more about Project Pulse? Reach out
              and we'll get back to you as soon as possible.
            </p>
          </div>

          <form onSubmit={handleContactSubmit} className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={contactForm.name}
                  onChange={handleContactChange}
                  placeholder="John Doe"
                  required
                  className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 focus:outline-none transition-all bg-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={contactForm.email}
                  onChange={handleContactChange}
                  placeholder="john@example.com"
                  required
                  className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 focus:outline-none transition-all bg-white"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Message
                </label>
                <textarea
                  name="message"
                  value={contactForm.message}
                  onChange={handleContactChange}
                  placeholder="Tell us what's on your mind..."
                  required
                  className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 focus:outline-none transition-all resize-none bg-white"
                  rows={5}
                ></textarea>
              </div>
              
              {/* Error / Success Messages */}
              {contactError && (
                <div className="sm:col-span-2 animate-fade-in">
                  <p className="text-red-600 text-sm font-medium bg-red-50 p-3 rounded-lg border border-red-200">
                    {contactError}
                  </p>
                </div>
              )}
              {contactSuccess && (
                <div className="sm:col-span-2 animate-fade-in">
                  <p className="text-green-600 text-sm font-medium bg-green-50 p-3 rounded-lg border border-green-200">
                    {contactSuccess}
                  </p>
                </div>
              )}
              
              <div className="sm:col-span-2">
                <button
                  type="submit"
                  disabled={contactLoading}
                  className={`w-full text-white font-semibold py-4 px-10 rounded-xl text-lg 
                             transition-all duration-300 ease-in-out transform shadow-lg hover:shadow-2xl 
                             hover:-translate-y-1 active:scale-95 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50
                             ${
                               contactLoading
                                 ? "bg-gray-400 cursor-not-allowed"
                                 : "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                             }`}
                >
                  <span className="flex items-center justify-center gap-2">
                    {contactLoading && (
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    )}
                    {contactLoading ? "Sending..." : "Send Message"}
                  </span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
