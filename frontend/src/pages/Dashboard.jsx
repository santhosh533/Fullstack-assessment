import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Dashboard() {
  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const userName = localStorage.getItem("user_name");
  const userId = localStorage.getItem("user_id");

  const handleUpload = async (e) => {
    e.preventDefault();
    setMessage(""); setError(""); setLoading(true);
    const formData = new FormData();
    formData.append("file1", file1);
    formData.append("file2", file2);
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/files/upload?user_name=${userName}&user_id=${userId}`,
        formData, { headers: { "Content-Type": "multipart/form-data" } }
      );
      setMessage("Files uploaded successfully!");
    } catch (err) {
      setError(err.response?.data?.detail || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div style={{minHeight:"100vh", background:"#f5f5f5", fontFamily:"'Segoe UI', Arial, sans-serif"}}>

      {/* Navbar */}
      <div style={{background:"white", borderBottom:"3px solid #a100ff", padding:"0 40px", display:"flex", alignItems:"center", justifyContent:"space-between", height:"64px", boxShadow:"0 2px 8px rgba(0,0,0,0.05)"}}>
        <div style={{fontSize:"24px", fontWeight:"800", color:"#a100ff", letterSpacing:"-1px"}}>
          SoftMania
        </div>
        <div style={{display:"flex", alignItems:"center", gap:"20px"}}>
          <span style={{fontSize:"14px", color:"#333", fontWeight:"500"}}>
            👤 {userName}
          </span>
          <button onClick={handleLogout}
            style={{padding:"8px 20px", background:"#a100ff", color:"white", border:"none", borderRadius:"4px", fontSize:"13px", fontWeight:"600", cursor:"pointer"}}>
            Sign Out
          </button>
        </div>
      </div>

      {/* Content */}
      <div style={{maxWidth:"900px", margin:"40px auto", padding:"0 24px"}}>

        {/* Welcome Banner */}
        <div style={{background:"white", borderLeft:"4px solid #a100ff", padding:"24px 28px", borderRadius:"4px", marginBottom:"28px", boxShadow:"0 1px 4px rgba(0,0,0,0.06)"}}>
          <h2 style={{fontSize:"20px", fontWeight:"700", color:"#1a1a1a", margin:"0 0 4px 0"}}>
            Welcome, {userName}
          </h2>
          <p style={{color:"#666", fontSize:"14px", margin:0}}>
            Manage your files and documents from this dashboard.
          </p>
        </div>

        <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:"24px"}}>

          {/* Upload Section */}
          <div style={{background:"white", borderRadius:"4px", padding:"28px", boxShadow:"0 1px 4px rgba(0,0,0,0.06)"}}>
            <div style={{display:"flex", alignItems:"center", gap:"10px", marginBottom:"20px", borderBottom:"2px solid #f0f0f0", paddingBottom:"16px"}}>
              <div style={{width:"4px", height:"20px", background:"#a100ff", borderRadius:"2px"}}></div>
              <h3 style={{fontSize:"16px", fontWeight:"700", color:"#1a1a1a", margin:0}}>Upload Files</h3>
            </div>

            {message && (
              <div style={{background:"#f0fff4", border:"1px solid #b7ebc0", color:"#276749", padding:"10px 14px", borderRadius:"4px", fontSize:"13px", marginBottom:"16px"}}>
                ✓ {message}
              </div>
            )}
            {error && (
              <div style={{background:"#fff0f0", border:"1px solid #ffcccc", color:"#cc0000", padding:"10px 14px", borderRadius:"4px", fontSize:"13px", marginBottom:"16px"}}>
                ✗ {error}
              </div>
            )}

            <form onSubmit={handleUpload}>
              <div style={{marginBottom:"16px"}}>
                <label style={{display:"block", fontSize:"13px", fontWeight:"600", color:"#333", marginBottom:"6px"}}>
                  Document 1
                </label>
                <input type="file" accept=".pdf,.png,.jpg,.jpeg"
                  onChange={e => setFile1(e.target.files[0])}
                  style={{width:"100%", padding:"8px", border:"1px solid #ddd", borderRadius:"4px", fontSize:"13px", boxSizing:"border-box"}} />
                <p style={{fontSize:"11px", color:"#999", margin:"4px 0 0"}}>PDF, PNG, JPEG only</p>
              </div>

              <div style={{marginBottom:"20px"}}>
                <label style={{display:"block", fontSize:"13px", fontWeight:"600", color:"#333", marginBottom:"6px"}}>
                  Document 2
                </label>
                <input type="file" accept=".pdf,.png,.jpg,.jpeg"
                  onChange={e => setFile2(e.target.files[0])}
                  style={{width:"100%", padding:"8px", border:"1px solid #ddd", borderRadius:"4px", fontSize:"13px", boxSizing:"border-box"}} />
                <p style={{fontSize:"11px", color:"#999", margin:"4px 0 0"}}>PDF, PNG, JPEG only</p>
              </div>

              <button type="submit" disabled={loading}
                style={{width:"100%", padding:"11px", background: loading ? "#ccc" : "#a100ff", color:"white", border:"none", borderRadius:"4px", fontSize:"14px", fontWeight:"700", cursor: loading ? "not-allowed" : "pointer"}}>
                {loading ? "Uploading..." : "Upload Files"}
              </button>
            </form>
          </div>

          {/* Download Section */}
          <div style={{background:"white", borderRadius:"4px", padding:"28px", boxShadow:"0 1px 4px rgba(0,0,0,0.06)"}}>
            <div style={{display:"flex", alignItems:"center", gap:"10px", marginBottom:"20px", borderBottom:"2px solid #f0f0f0", paddingBottom:"16px"}}>
              <div style={{width:"4px", height:"20px", background:"#a100ff", borderRadius:"2px"}}></div>
              <h3 style={{fontSize:"16px", fontWeight:"700", color:"#1a1a1a", margin:0}}>Downloads</h3>
            </div>

            <div style={{background:"#f9f9f9", border:"1px solid #eee", borderRadius:"4px", padding:"20px", marginBottom:"16px"}}>
              <div style={{fontSize:"32px", marginBottom:"8px"}}>📄</div>
              <p style={{fontSize:"14px", fontWeight:"600", color:"#333", margin:"0 0 4px"}}>Sample Document</p>
              <p style={{fontSize:"12px", color:"#999", margin:"0 0 16px"}}>Click below to download the sample file</p>
              <button
                onClick={() => window.open(`${import.meta.env.VITE_API_URL}/files/download-sample`, "_blank")}
                style={{width:"100%", padding:"11px", background:"white", color:"#a100ff", border:"2px solid #a100ff", borderRadius:"4px", fontSize:"14px", fontWeight:"700", cursor:"pointer"}}>
                Download Sample
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}