import React from "react";
import { useParams } from "react-router-dom";
import { configOptions } from "../features/ecommerce-home/api/configOptions";
import { ConfigSwitcher, DemoNavigation } from "../features/ecommerce-home/components";

export const DemoPage: React.FC = () => {
  const { configId } = useParams<{ configId: string }>();
  
  // Get current config details
  const currentConfig = configOptions.find(opt => opt.id === configId);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100">
      {/* Configuration Switcher */}
      <ConfigSwitcher />
      
      {/* Demo Navigation */}
      <DemoNavigation />

      {/* Demo Information Banner */}
      <div className="fixed top-0 left-0 right-0 bg-gradient-to-r from-green-600 to-blue-600 text-white p-3 text-center z-30">
        <div className="max-w-4xl mx-auto">
          <p className="text-sm md:text-base">
            <span className="font-semibold">🎨 Layout Demo</span> - Interactive showcase of config-driven components
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-800 mb-4">
              Component Showcase
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore how the same components can create completely different user experiences
              through configuration-driven design.
            </p>
          </div>

          {/* Current Config Display */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Current Layout: {currentConfig?.name}
                </h2>
                <p className="text-gray-600">{currentConfig?.description}</p>
              </div>
              <div 
                className="w-16 h-16 rounded-full border-4 border-white shadow-lg"
                style={{ backgroundColor: currentConfig?.color }}
              />
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="text-3xl mb-4">🔧</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Configuration Engine
              </h3>
              <p className="text-gray-600">
                Powerful JSON-based configuration system that defines component 
                behavior, styling, and layout without touching code.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="text-3xl mb-4">⚡</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Real-time Switching
              </h3>
              <p className="text-gray-600">
                Switch between layouts instantly with the gear button. 
                All changes are reflected immediately without page refresh.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="text-3xl mb-4">🎨</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Design Flexibility
              </h3>
              <p className="text-gray-600">
                Create drastically different UIs for e-commerce, SaaS, 
                portfolios, and more using the same component library.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="text-3xl mb-4">🔗</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Router Integration
              </h3>
              <p className="text-gray-600">
                Layout configurations are stored in the URL, making them 
                bookmarkable and shareable across all pages.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="text-3xl mb-4">🛡️</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Error Handling
              </h3>
              <p className="text-gray-600">
                Robust error boundaries and validation ensure graceful 
                fallbacks when components fail to load or configs are invalid.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="text-3xl mb-4">📱</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Responsive Design
              </h3>
              <p className="text-gray-600">
                All layouts automatically adapt to different screen sizes 
                with mobile-first responsive design principles.
              </p>
            </div>
          </div>

          {/* Code Example */}
          <div className="bg-gray-900 rounded-2xl shadow-xl p-8 text-white">
            <h2 className="text-2xl font-bold mb-4">Configuration Example</h2>
            <pre className="bg-gray-800 rounded-lg p-4 overflow-x-auto text-sm">
              <code>{`{
  "id": "ecommerce",
  "name": "E-commerce Store",
  "components": [
    {
      "type": "Navbar",
      "props": {
        "logo": "ShopCo",
        "showSearch": true,
        "cartCount": 3
      }
    },
    {
      "type": "HeroSection", 
      "props": {
        "title": "Discover Amazing Products",
        "subtitle": "Shop the latest trends",
        "ctaText": "Shop Now"
      }
    }
  ]
}`}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
