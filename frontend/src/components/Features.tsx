import React from 'react';
import { 
  Zap, 
  Layers, 
  Users, 
  BarChart3, 
  Edit3, 
  Shield, 
  Smartphone,
  CheckCircle2,
  Clock,
  PlayCircle
} from 'lucide-react';

export const Features: React.FC = () => {
  const coreFeatures = [
    {
      icon: <Zap className="w-12 h-12 text-blue-600" />,
      title: 'Track Progress',
      description: 'Monitor project status and milestones in real-time with our intuitive dashboard. Get instant visibility into all your ongoing projects and stay on top of deadlines with visual status indicators.',
    },
    {
      icon: <Layers className="w-12 h-12 text-blue-600" />,
      title: 'Manage Tasks',
      description: 'Organize and prioritize your work with ease. Create projects, add detailed descriptions, set status updates, and keep everything organized in one centralized location. Full CRUD operations at your fingertips.',
    },
    {
      icon: <Users className="w-12 h-12 text-blue-600" />,
      title: 'Collaborate Easily',
      description: 'Keep your team in sync with shared project visibility. Everyone stays informed about project progress, status changes, and important updates. Role-based access ensures the right people have the right permissions.',
    },
  ];

  const additionalFeatures = [
    {
      icon: <BarChart3 className="w-10 h-10 text-green-600" />,
      title: 'Real-Time Statistics',
      description: 'Get instant insights with project statistics showing total projects, completed tasks, in-progress items, and pending work. Make data-driven decisions with comprehensive project analytics.',
    },
    {
      icon: <Edit3 className="w-10 h-10 text-purple-600" />,
      title: 'Full CRUD Operations',
      description: 'Create, read, update, and delete projects seamlessly. Edit project details inline, update statuses with a single click, and manage your entire project portfolio effortlessly.',
    },
    {
      icon: <Shield className="w-10 h-10 text-red-600" />,
      title: 'Secure & Role-Based',
      description: 'Built-in authentication and authorization system. Admin users have full control to edit and manage projects, while regular users can view and track progress. Your data is secure and protected.',
    },
    {
      icon: <Smartphone className="w-10 h-10 text-orange-600" />,
      title: 'Fully Responsive',
      description: 'Access Project Pulse from any device - desktop, tablet, or mobile. Our responsive design ensures a seamless experience across all screen sizes, so you can manage projects on the go.',
    },
    {
      icon: <CheckCircle2 className="w-10 h-10 text-teal-600" />,
      title: 'Status Management',
      description: 'Easily update project status with three clear states: Not Started, In Progress, and Completed. Visual indicators help you quickly identify project status at a glance.',
    },
    {
      icon: <Clock className="w-10 h-10 text-indigo-600" />,
      title: 'Real-Time Updates',
      description: 'All changes are instantly reflected across the dashboard. No page refreshes needed - see your project updates in real-time as you work.',
    },
  ];

  return (
    <div className="bg-gradient-to-br from-gray-50 to-white min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 py-16 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
            Project Pulse Features
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Everything you need to manage projects effectively, all in one powerful dashboard
          </p>
        </div>
      </div>

      {/* Core Features Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Core Features</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            The essential tools every team needs to track and manage projects successfully
          </p>
        </div>
        
        <div className="space-y-6">
          {coreFeatures.map((feature, idx) => (
            <div
              key={idx}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border-l-4 border-blue-600 hover:-translate-y-1 group"
            >
              <div className="flex flex-col md:flex-row items-start gap-6">
                <div className="flex-shrink-0 bg-blue-50 p-4 rounded-xl group-hover:bg-blue-100 transition">
                  {feature.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-lg leading-relaxed">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Additional Features Grid */}
      <div className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Additional Capabilities</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Powerful features that make Project Pulse a complete project management solution
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {additionalFeatures.map((feature, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-xl shadow-md hover:shadow-xl border border-gray-200 transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="flex flex-col">
                  <div className="mb-4 bg-gray-100 p-3 rounded-lg w-fit group-hover:scale-110 transition">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Technical Highlights */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 py-16 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Built with Modern Technology</h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Leveraging the latest web technologies for performance and reliability
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
              <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                <PlayCircle className="w-6 h-6 text-blue-400" />
                Frontend Stack
              </h3>
              <ul className="space-y-2 text-gray-300">
                <li>• React 18 with TypeScript</li>
                <li>• Vite for fast builds</li>
                <li>• Tailwind CSS for styling</li>
                <li>• Context API for state management</li>
                <li>• Responsive design principles</li>
              </ul>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
              <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                <Shield className="w-6 h-6 text-green-400" />
                Backend Stack
              </h3>
              <ul className="space-y-2 text-gray-300">
                <li>• FastAPI for RESTful APIs</li>
                <li>• SQLite database</li>
                <li>• SQLAlchemy ORM</li>
                <li>• JWT authentication</li>
                <li>• Pydantic validation</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};