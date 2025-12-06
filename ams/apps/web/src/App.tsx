import React from "react";
import { AppRouter } from "./router";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <AppRouter />
    </div>
  );
};

export default App;
