import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { configOptions } from "../api/configOptions";

interface ConfigSwitcherProps {
  isLoading?: boolean;
}

export const ConfigSwitcher: React.FC<ConfigSwitcherProps> = ({
  isLoading = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { configId: currentConfigId } = useParams<{ configId: string }>();

  useEffect(() => {
    // Auto-open if URL contains hash
    if (window.location.href.includes("#switcher")) {
      setIsOpen(true);
    }
  }, []);

  const handleConfigChange = (configId: string) => {
    navigate(`/${configId}`, { replace: true });
    setIsOpen(false);
  };

  return (
    <div className="fixed top-4 left-4 z-50">
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-white shadow-lg rounded-full p-3 hover:shadow-xl transition-all duration-300 border-2 border-gray-200 hover:border-blue-300 group"
        disabled={isLoading}
      >
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 flex items-center justify-center">
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <span className="text-xl group-hover:rotate-180 transition-transform duration-300">
                ⚙️
              </span>
            )}
          </div>
          <span className="font-semibold text-gray-700 hidden sm:block">
            Switch Layout
          </span>
        </div>
      </button>

      {/* Config Options Panel */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-20 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          {/* Panel */}
          <div className="absolute top-16 left-0 bg-white rounded-xl shadow-2xl border border-gray-200 p-6 min-w-[320px] max-w-[400px] animate-in slide-in-from-top-5 duration-300">
            <div className="mb-4">
              <h3 className="text-lg font-bold text-gray-800 mb-1">
                Choose a Layout
              </h3>
              <p className="text-sm text-gray-600">
                See how the same components create completely different
                experiences
              </p>
            </div>

            <div className="space-y-3">
              {configOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleConfigChange(option.id)}
                  disabled={isLoading || currentConfigId === option.id}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed ${
                    currentConfigId === option.id
                      ? "border-blue-500 bg-blue-50 shadow-sm"
                      : "border-gray-200 hover:border-gray-300 bg-white"
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div
                      className="w-4 h-4 rounded-full mt-1 flex-shrink-0"
                      style={{ backgroundColor: option.color }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-semibold text-gray-800 text-sm">
                          {option.name}
                        </h4>
                        {currentConfigId === option.id && (
                          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                            Active
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        {option.description}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100">
              <div className="flex items-center text-xs text-gray-500">
                <span className="mr-2">💡</span>
                <span>
                  Each layout uses the same component library with different
                  configurations
                </span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
