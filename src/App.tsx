import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { AboutPage } from "./pages/AboutPage";
import { DemoPage } from "./pages/DemoPage";

function App() {
  return (
    <Routes>
      {/* Default route redirects to ecommerce config */}
      <Route path="/" element={<Navigate to="/ecommerce" replace />} />
      
      {/* Routes with config parameter */}
      <Route path="/:configId" element={<HomePage />} />
      <Route path="/:configId/about" element={<AboutPage />} />
      <Route path="/:configId/demo" element={<DemoPage />} />
      
      {/* Catch-all route for invalid configs */}
      <Route path="*" element={<Navigate to="/ecommerce" replace />} />
    </Routes>
  );
}

export default App;
