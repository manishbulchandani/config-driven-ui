import React from "react";
import { useParams } from "react-router-dom";
import { configOptions } from "../features/ecommerce-home/api/configOptions";
import { ConfigSwitcher, DemoNavigation } from "../features/ecommerce-home/components";

export const AboutPage: React.FC = () => {
  const { configId } = useParams<{ configId: string }>();
  
  // Get current config details
  const currentConfig = configOptions.find(opt => opt.id === configId);
  const configName = currentConfig?.name || "Unknown";

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Configuration Switcher */}
      <ConfigSwitcher />
      
      {/* Demo Navigation */}
      <DemoNavigation />

      {/* Demo Information Banner */}
      <div className="fixed top-0 left-0 right-0 bg-gradient-to-r from-purple-600 to-blue-600 text-white p-3 text-center z-30">
        <div className="max-w-4xl mx-auto">
          <p className="text-sm md:text-base">
            <span className="font-semibold">🔧 Config-Driven UI Demo</span> - Layout switcher works across all pages!
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-6">
              About This Demo
            </h1>
            
            <div className="prose max-w-none text-gray-600 leading-relaxed">
              <p className="text-lg mb-6">
                This is a demonstration of a <strong>Config-Driven UI</strong> system that allows
                completely different user interfaces to be created using the same set of components,
                just with different configurations.
              </p>

              <div className="grid md:grid-cols-2 gap-8 my-8">
                <div className="bg-blue-50 p-6 rounded-xl">
                  <h3 className="font-bold text-blue-800 mb-3">🎨 Current Layout</h3>
                  <p className="text-blue-700 font-semibold">{configName}</p>
                  <p className="text-blue-600 text-sm mt-2">
                    {currentConfig?.description}
                  </p>
                </div>

                <div className="bg-green-50 p-6 rounded-xl">
                  <h3 className="font-bold text-green-800 mb-3">⚡ Router Integration</h3>
                  <p className="text-green-700">
                    The layout switcher now works across all pages using React Router DOM.
                    The current config is stored in the URL path.
                  </p>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-800 mb-4">How It Works</h2>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <span className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm mt-1">1</span>
                  <div>
                    <h4 className="font-semibold text-gray-800">Component Registry</h4>
                    <p>All UI components are registered in a central registry that maps component names to React components.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <span className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm mt-1">2</span>
                  <div>
                    <h4 className="font-semibold text-gray-800">Configuration Engine</h4>
                    <p>JSON configurations define which components to render, their properties, and layout arrangements.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <span className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm mt-1">3</span>
                  <div>
                    <h4 className="font-semibold text-gray-800">Dynamic Rendering</h4>
                    <p>The ConfigRenderer processes configurations and dynamically renders the appropriate components with their props.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <span className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm mt-1">4</span>
                  <div>
                    <h4 className="font-semibold text-gray-800">Router Integration</h4>
                    <p>React Router DOM manages the current configuration through URL parameters, making layouts bookmarkable and shareable.</p>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-8">
                <h4 className="font-bold text-yellow-800 mb-2">💡 Try It Out</h4>
                <p className="text-yellow-700">
                  Use the gear icon in the top-left corner to switch between different layouts.
                  Notice how the URL changes and the layout persists as you navigate between pages!
                </p>
              </div>

              <h2 className="text-2xl font-bold text-gray-800 mb-4">Available Layouts</h2>
              
              <div className="grid gap-4">
                {configOptions.map((config) => (
                  <div key={config.id} className="border rounded-lg p-4 flex items-center space-x-4">
                    <div 
                      className="w-4 h-4 rounded-full" 
                      style={{ backgroundColor: config.color }}
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800">{config.name}</h4>
                      <p className="text-gray-600 text-sm">{config.description}</p>
                    </div>
                    {configId === config.id && (
                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                        Current
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
