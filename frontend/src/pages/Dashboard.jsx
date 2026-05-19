import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Dashboard() {
  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const userName = localStorage.getItem("user_name");
  const userId = localStorage.getItem("user_id");

  const handleUpload = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    const formData = new FormData();
    formData.append("file1", file1);
    formData.append("file2", file2);

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/files/upload?user_name=${userName}&user_id=${userId}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setMessage("✅ Files uploaded successfully!");
    } catch (err) {
      setError(err.response?.data?.detail || "Upload failed");
    }
  };

  const handleDownload = () => {
    window.open(`${import.meta.env.VITE_API_URL}/files/download-sample`, "_blank");
  };

  const handleLogout = () => {
    localStorage.removeItem("user_name");
    localStorage.removeItem("user_id");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-lg mx-auto">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Welcome, <span className="text-blue-600">{userName}</span>! 👋
          </h2>
          <button onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 text-sm">
            Logout
          </button>
        </div>

        {/* Upload Section */}
        <div className="bg-white p-6 rounded shadow mb-4">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">📤 Upload Files</h3>
          {message && <p className="text-green-600 text-sm mb-2">{message}</p>}
          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
          <form onSubmit={handleUpload} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                File 1 (PDF / PNG / JPEG only)
              </label>
              <input type="file" accept=".pdf,.png,.jpg,.jpeg"
                onChange={e => setFile1(e.target.files[0])} required
                className="w-full border p-2 rounded text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                File 2 (PDF / PNG / JPEG only)
              </label>
              <input type="file" accept=".pdf,.png,.jpg,.jpeg"
                onChange={e => setFile2(e.target.files[0])} required
                className="w-full border p-2 rounded text-sm" />
            </div>
            <button type="submit"
              className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 font-semibold">
              Upload Files
            </button>
          </form>
        </div>

        {/* Download Section */}
        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">📥 Download Sample File</h3>
          <button onClick={handleDownload}
            className="w-full bg-gray-700 text-white p-2 rounded hover:bg-gray-800 font-semibold">
            ⬇️ Download Sample File
          </button>
        </div>

      </div>
    </div>
  );
}