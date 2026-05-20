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
    <div style={{minHeight:"100vh", display:"flex", fontFamily:"'Segoe UI', Arial, sans-serif", background:"#f5f5f5"}}>

      {/* Left Panel */}
      <div style={{width:"420px", background:"#a100ff", display:"flex", flexDirection:"column", justifyContent:"center", padding:"60px 48px", color:"white"}}>
        <div style={{fontSize:"32px", fontWeight:"800", letterSpacing:"-1px", marginBottom:"8px"}}>
          accenture
        </div>
        <div style={{width:"40px", height:"3px", background:"white", marginBottom:"32px"}}></div>
        <h2 style={{fontSize:"28px", fontWeight:"700", marginBottom:"16px", lineHeight:"1.3"}}>
          Welcome back
        </h2>
        <p style={{fontSize:"15px", opacity:"0.85", lineHeight:"1.7"}}>
          Sign in to access your account and continue where you left off.
        </p>
        <div style={{marginTop:"48px", borderTop:"1px solid rgba(255,255,255,0.2)", paddingTop:"24px"}}>
          <p style={{fontSize:"13px", opacity:"0.7"}}>Don't have an account?</p>
          <a href="/signup" style={{color:"white", fontWeight:"600", fontSize:"14px", textDecoration:"none", borderBottom:"1px solid white"}}>
            Register here →
          </a>
        </div>
      </div>

      {/* Right Panel */}
      <div style={{flex:1, display:"flex", alignItems:"center", justifyContent:"center", padding:"40px"}}>
        <div style={{width:"100%", maxWidth:"400px"}}>

          <h3 style={{fontSize:"22px", fontWeight:"700", color:"#1a1a1a", marginBottom:"4px"}}>
            Sign In
          </h3>
          <p style={{color:"#666", fontSize:"14px", marginBottom:"32px"}}>
            Enter your credentials to continue
          </p>

          {error && (
            <div style={{background:"#fff0f0", border:"1px solid #ffcccc", color:"#cc0000", padding:"12px 16px", borderRadius:"4px", fontSize:"14px", marginBottom:"20px"}}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{marginBottom:"16px"}}>
              <label style={{display:"block", fontSize:"13px", fontWeight:"600", color:"#333", marginBottom:"6px"}}>
                Email Address *
              </label>
              <input type="email" placeholder="john@example.com" required
                style={{width:"100%", padding:"10px 14px", border:"1px solid #ddd", borderRadius:"4px", fontSize:"14px", outline:"none", boxSizing:"border-box"}}
                onChange={e => setForm({...form, email: e.target.value})} />
            </div>

            <div style={{marginBottom:"28px"}}>
              <label style={{display:"block", fontSize:"13px", fontWeight:"600", color:"#333", marginBottom:"6px"}}>
                Password *
              </label>
              <input type="password" placeholder="••••••••" required
                style={{width:"100%", padding:"10px 14px", border:"1px solid #ddd", borderRadius:"4px", fontSize:"14px", outline:"none", boxSizing:"border-box"}}
                onChange={e => setForm({...form, password: e.target.value})} />
            </div>

            <button type="submit" disabled={loading}
              style={{width:"100%", padding:"12px", background: loading ? "#ccc" : "#a100ff", color:"white", border:"none", borderRadius:"4px", fontSize:"15px", fontWeight:"700", cursor: loading ? "not-allowed" : "pointer", letterSpacing:"0.5px"}}>
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p style={{textAlign:"center", fontSize:"12px", color:"#999", marginTop:"32px"}}>
            © 2024 Accenture. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}