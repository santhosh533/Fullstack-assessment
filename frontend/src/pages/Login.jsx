import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, form);
      localStorage.setItem("user_name", res.data.user_name);
      localStorage.setItem("user_id", res.data.user_id);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.detail || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{minHeight:"100vh", background:"#f5f5f5", fontFamily:"'Segoe UI', Arial, sans-serif", display:"flex", flexDirection:"column"}}>

      {/* Top Navbar */}
      <div style={{background:"white", borderBottom:"3px solid #a100ff", padding:"0 40px", height:"60px", display:"flex", alignItems:"center", boxShadow:"0 2px 8px rgba(0,0,0,0.05)"}}>
        <span style={{fontSize:"26px", fontWeight:"800", color:"#a100ff", letterSpacing:"-1px"}}>SoftMania</span>
      </div>

      {/* Center Content */}
      <div style={{flex:1, display:"flex", alignItems:"center", justifyContent:"center", padding:"40px 20px"}}>
        <div style={{background:"white", borderRadius:"6px", boxShadow:"0 2px 12px rgba(0,0,0,0.08)", padding:"40px", width:"100%", maxWidth:"420px"}}>

          <div style={{borderLeft:"4px solid #a100ff", paddingLeft:"16px", marginBottom:"28px"}}>
            <h2 style={{fontSize:"22px", fontWeight:"700", color:"#1a1a1a", margin:"0 0 4px"}}>Sign In</h2>
            <p style={{fontSize:"13px", color:"#888", margin:0}}>Enter your credentials to continue</p>
          </div>

          {error && (
            <div style={{background:"#fff0f0", border:"1px solid #ffcccc", color:"#cc0000", padding:"12px 16px", borderRadius:"4px", fontSize:"13px", marginBottom:"20px"}}>
              ✗ {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{marginBottom:"16px"}}>
              <label style={{display:"block", fontSize:"12px", fontWeight:"600", color:"#555", marginBottom:"6px", textTransform:"uppercase", letterSpacing:"0.5px"}}>
                Email Address *
              </label>
              <input type="email" placeholder="john@example.com" required
                style={{width:"100%", padding:"10px 12px", border:"1px solid #ddd", borderRadius:"4px", fontSize:"14px", outline:"none", boxSizing:"border-box"}}
                onFocus={e => e.target.style.border="1px solid #a100ff"}
                onBlur={e => e.target.style.border="1px solid #ddd"}
                onChange={e => setForm({...form, email: e.target.value})} />
            </div>

            <div style={{marginBottom:"24px"}}>
              <label style={{display:"block", fontSize:"12px", fontWeight:"600", color:"#555", marginBottom:"6px", textTransform:"uppercase", letterSpacing:"0.5px"}}>
                Password *
              </label>
              <input type="password" placeholder="••••••••" required
                style={{width:"100%", padding:"10px 12px", border:"1px solid #ddd", borderRadius:"4px", fontSize:"14px", outline:"none", boxSizing:"border-box"}}
                onFocus={e => e.target.style.border="1px solid #a100ff"}
                onBlur={e => e.target.style.border="1px solid #ddd"}
                onChange={e => setForm({...form, password: e.target.value})} />
            </div>

            <button type="submit" disabled={loading}
              style={{width:"100%", padding:"12px", background: loading ? "#ccc" : "#a100ff", color:"white", border:"none", borderRadius:"4px", fontSize:"14px", fontWeight:"700", cursor: loading ? "not-allowed" : "pointer", letterSpacing:"0.5px"}}>
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p style={{textAlign:"center", fontSize:"13px", color:"#666", marginTop:"20px"}}>
            Don't have an account?{" "}
            <a href="/signup" style={{color:"#a100ff", fontWeight:"600", textDecoration:"none"}}>Register</a>
          </p>

          <p style={{textAlign:"center", fontSize:"11px", color:"#bbb", marginTop:"24px"}}>
            © 2024 SoftMania. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}