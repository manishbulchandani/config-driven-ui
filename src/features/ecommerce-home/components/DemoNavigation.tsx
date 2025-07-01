import React from "react";
import { Link, useParams } from "react-router-dom";

export const DemoNavigation: React.FC = () => {
  const { configId } = useParams<{ configId: string }>();
  
  const navItems = [
    { path: "/", label: "Home", icon: "🏠" },
    { path: "/about", label: "About", icon: "ℹ️" },
    { path: "/demo", label: "Demo", icon: "🎨" },
  ];

  return (
    <nav className="fixed bottom-4 right-4 bg-white rounded-full shadow-lg border-2 border-gray-200 p-2 z-40">
      <div className="flex items-center space-x-1">
        {navItems.map((item) => {
          const to = configId ? `/${configId}${item.path === "/" ? "" : item.path}` : item.path;
          
          return (
            <Link
              key={item.path}
              to={to}
              className="flex items-center space-x-2 px-3 py-2 rounded-full text-sm font-medium transition-colors hover:bg-blue-50 hover:text-blue-600"
              title={item.label}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="hidden sm:inline">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
