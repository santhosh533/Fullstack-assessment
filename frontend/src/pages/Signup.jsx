import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Signup() {
  const [form, setForm] = useState({
    name: "", age: "", address: "", email: "", mobile: "", password: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/auth/signup`, {
        ...form, age: parseInt(form.age)
      });
      alert("Signup successful!");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.detail || "Signup failed");
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
          Create your account
        </h2>
        <p style={{fontSize:"15px", opacity:"0.85", lineHeight:"1.7"}}>
          Join our platform to access powerful tools and resources designed for your success.
        </p>
        <div style={{marginTop:"48px", borderTop:"1px solid rgba(255,255,255,0.2)", paddingTop:"24px"}}>
          <p style={{fontSize:"13px", opacity:"0.7"}}>Already have an account?</p>
          <a href="/login" style={{color:"white", fontWeight:"600", fontSize:"14px", textDecoration:"none", borderBottom:"1px solid white"}}>
            Sign in here →
          </a>
        </div>
      </div>

      {/* Right Panel */}
      <div style={{flex:1, display:"flex", alignItems:"center", justifyContent:"center", padding:"40px"}}>
        <div style={{width:"100%", maxWidth:"480px"}}>
          
          <h3 style={{fontSize:"22px", fontWeight:"700", color:"#1a1a1a", marginBottom:"4px"}}>
            Register
          </h3>
          <p style={{color:"#666", fontSize:"14px", marginBottom:"32px"}}>
            Fill in your details to get started
          </p>

          {error && (
            <div style={{background:"#fff0f0", border:"1px solid #ffcccc", color:"#cc0000", padding:"12px 16px", borderRadius:"4px", fontSize:"14px", marginBottom:"20px"}}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:"16px", marginBottom:"16px"}}>
              <div>
                <label style={{display:"block", fontSize:"13px", fontWeight:"600", color:"#333", marginBottom:"6px"}}>
                  Full Name *
                </label>
                <input type="text" placeholder="John Doe" required
                  style={{width:"100%", padding:"10px 14px", border:"1px solid #ddd", borderRadius:"4px", fontSize:"14px", outline:"none", boxSizing:"border-box"}}
                  onChange={e => setForm({...form, name: e.target.value})} />
              </div>
              <div>
                <label style={{display:"block", fontSize:"13px", fontWeight:"600", color:"#333", marginBottom:"6px"}}>
                  Age *
                </label>
                <input type="number" placeholder="25" required
                  style={{width:"100%", padding:"10px 14px", border:"1px solid #ddd", borderRadius:"4px", fontSize:"14px", outline:"none", boxSizing:"border-box"}}
                  onChange={e => setForm({...form, age: e.target.value})} />
              </div>
            </div>

            <div style={{marginBottom:"16px"}}>
              <label style={{display:"block", fontSize:"13px", fontWeight:"600", color:"#333", marginBottom:"6px"}}>
                Address *
              </label>
              <input type="text" placeholder="123 Main Street, City" required
                style={{width:"100%", padding:"10px 14px", border:"1px solid #ddd", borderRadius:"4px", fontSize:"14px", outline:"none", boxSizing:"border-box"}}
                onChange={e => setForm({...form, address: e.target.value})} />
            </div>

            <div style={{marginBottom:"16px"}}>
              <label style={{display:"block", fontSize:"13px", fontWeight:"600", color:"#333", marginBottom:"6px"}}>
                Email Address *
              </label>
              <input type="email" placeholder="john@example.com" required
                style={{width:"100%", padding:"10px 14px", border:"1px solid #ddd", borderRadius:"4px", fontSize:"14px", outline:"none", boxSizing:"border-box"}}
                onChange={e => setForm({...form, email: e.target.value})} />
            </div>

            <div style={{marginBottom:"16px"}}>
              <label style={{display:"block", fontSize:"13px", fontWeight:"600", color:"#333", marginBottom:"6px"}}>
                Mobile Number *
              </label>
              <input type="tel" placeholder="9876543210" required
                style={{width:"100%", padding:"10px 14px", border:"1px solid #ddd", borderRadius:"4px", fontSize:"14px", outline:"none", boxSizing:"border-box"}}
                onChange={e => setForm({...form, mobile: e.target.value})} />
            </div>

            <div style={{marginBottom:"24px"}}>
              <label style={{display:"block", fontSize:"13px", fontWeight:"600", color:"#333", marginBottom:"6px"}}>
                Password *
              </label>
              <input type="password" placeholder="••••••••" required
                style={{width:"100%", padding:"10px 14px", border:"1px solid #ddd", borderRadius:"4px", fontSize:"14px", outline:"none", boxSizing:"border-box"}}
                onChange={e => setForm({...form, password: e.target.value})} />
            </div>

            <button type="submit" disabled={loading}
              style={{width:"100%", padding:"12px", background: loading ? "#ccc" : "#a100ff", color:"white", border:"none", borderRadius:"4px", fontSize:"15px", fontWeight:"700", cursor: loading ? "not-allowed" : "pointer", letterSpacing:"0.5px"}}>
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <p style={{textAlign:"center", fontSize:"12px", color:"#999", marginTop:"24px"}}>
            © 2024 Accenture. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}