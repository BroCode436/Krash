import { useState } from "react";
import Feed from "./pages/Feed";
import Create from "./pages/Create";

function App() {
  const [page, setPage] = useState<"feed" | "create">("feed");

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Krash</h1>

      {/* Navigation */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setPage("feed")}
          className={`px-4 py-2 rounded-lg ${
            page === "feed"
              ? "bg-blue-600"
              : "bg-gray-800 hover:bg-gray-700"
          }`}
        >
          Home
        </button>

        <button
          onClick={() => setPage("create")}
          className={`px-4 py-2 rounded-lg ${
            page === "create"
              ? "bg-blue-600"
              : "bg-gray-800 hover:bg-gray-700"
          }`}
        >
          Create
        </button>
      </div>

      {/* Pages */}
      <div className="max-w-2xl">
        {page === "feed" && <Feed />}
        {page === "create" && <Create />}
      </div>
    </div>
  );
}

export default App;
