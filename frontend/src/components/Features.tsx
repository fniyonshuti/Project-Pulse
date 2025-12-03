import React from 'react';
import { Zap, Users, Layers } from 'lucide-react';

export const Features: React.FC = () => {
  const features = [
    {
      icon: <Zap className="w-12 h-12 text-blue-600" />,
      title: 'Track Progress',
      description: 'Monitor project status and milestones in real-time with our intuitive dashboard. Get instant visibility into all your ongoing projects and stay on top of deadlines.',
    },
    {
      icon: <Layers className="w-12 h-12 text-blue-600" />,
      title: 'Manage Tasks',
      description: 'Organize and prioritize your work with ease. Create projects, set status updates, and keep everything organized in one centralized location.',
    },
    {
      icon: <Users className="w-12 h-12 text-blue-600" />,
      title: 'Collaborate Easily',
      description: 'Keep your team in sync with shared project visibility. Everyone stays informed about project progress, status changes, and important updates.',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-bold text-gray-900 mb-12 text-center">
        Why Choose Project Pulse?
      </h1>
      <div className="space-y-8">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition border-l-4 border-blue-600"
          >
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 mt-1">{feature.icon}</div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-lg">{feature.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};