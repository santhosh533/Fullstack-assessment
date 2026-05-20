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
    <div style={{minHeight:"100vh", background:"#f5f5f5", fontFamily:"'Segoe UI', Arial, sans-serif", display:"flex", flexDirection:"column"}}>

      {/* Top Navbar */}
      <div style={{background:"white", borderBottom:"3px solid #a100ff", padding:"0 40px", height:"60px", display:"flex", alignItems:"center", boxShadow:"0 2px 8px rgba(0,0,0,0.05)"}}>
        <span style={{fontSize:"26px", fontWeight:"800", color:"#a100ff", letterSpacing:"-1px"}}>SoftMania</span>
      </div>

      {/* Center Content */}
      <div style={{flex:1, display:"flex", alignItems:"center", justifyContent:"center", padding:"40px 20px"}}>
        <div style={{background:"white", borderRadius:"6px", boxShadow:"0 2px 12px rgba(0,0,0,0.08)", padding:"40px", width:"100%", maxWidth:"520px"}}>

          <div style={{borderLeft:"4px solid #a100ff", paddingLeft:"16px", marginBottom:"28px"}}>
            <h2 style={{fontSize:"22px", fontWeight:"700", color:"#1a1a1a", margin:"0 0 4px"}}>Create Account</h2>
            <p style={{fontSize:"13px", color:"#888", margin:0}}>Fill in your details to register</p>
          </div>

          {error && (
            <div style={{background:"#fff0f0", border:"1px solid #ffcccc", color:"#cc0000", padding:"12px 16px", borderRadius:"4px", fontSize:"13px", marginBottom:"20px"}}>
              ✗ {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:"16px", marginBottom:"16px"}}>
              <div>
                <label style={{display:"block", fontSize:"12px", fontWeight:"600", color:"#555", marginBottom:"6px", textTransform:"uppercase", letterSpacing:"0.5px"}}>Full Name *</label>
                <input type="text" placeholder="John Doe" required
                  style={{width:"100%", padding:"10px 12px", border:"1px solid #ddd", borderRadius:"4px", fontSize:"14px", outline:"none", boxSizing:"border-box", transition:"border 0.2s"}}
                  onFocus={e => e.target.style.border="1px solid #a100ff"}
                  onBlur={e => e.target.style.border="1px solid #ddd"}
                  onChange={e => setForm({...form, name: e.target.value})} />
              </div>
              <div>
                <label style={{display:"block", fontSize:"12px", fontWeight:"600", color:"#555", marginBottom:"6px", textTransform:"uppercase", letterSpacing:"0.5px"}}>Age *</label>
                <input type="number" placeholder="25" required
                  style={{width:"100%", padding:"10px 12px", border:"1px solid #ddd", borderRadius:"4px", fontSize:"14px", outline:"none", boxSizing:"border-box"}}
                  onFocus={e => e.target.style.border="1px solid #a100ff"}
                  onBlur={e => e.target.style.border="1px solid #ddd"}
                  onChange={e => setForm({...form, age: e.target.value})} />
              </div>
            </div>

            {[
              {label:"Address", key:"address", type:"text", placeholder:"123 Main St, City"},
              {label:"Email Address", key:"email", type:"email", placeholder:"john@example.com"},
              {label:"Mobile Number", key:"mobile", type:"tel", placeholder:"9876543210"},
              {label:"Password", key:"password", type:"password", placeholder:"••••••••"},
            ].map(field => (
              <div key={field.key} style={{marginBottom:"16px"}}>
                <label style={{display:"block", fontSize:"12px", fontWeight:"600", color:"#555", marginBottom:"6px", textTransform:"uppercase", letterSpacing:"0.5px"}}>
                  {field.label} *
                </label>
                <input type={field.type} placeholder={field.placeholder} required
                  style={{width:"100%", padding:"10px 12px", border:"1px solid #ddd", borderRadius:"4px", fontSize:"14px", outline:"none", boxSizing:"border-box"}}
                  onFocus={e => e.target.style.border="1px solid #a100ff"}
                  onBlur={e => e.target.style.border="1px solid #ddd"}
                  onChange={e => setForm({...form, [field.key]: e.target.value})} />
              </div>
            ))}

            <button type="submit" disabled={loading}
              style={{width:"100%", padding:"12px", background: loading ? "#ccc" : "#a100ff", color:"white", border:"none", borderRadius:"4px", fontSize:"14px", fontWeight:"700", cursor: loading ? "not-allowed" : "pointer", marginTop:"8px", letterSpacing:"0.5px"}}>
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <p style={{textAlign:"center", fontSize:"13px", color:"#666", marginTop:"20px"}}>
            Already have an account?{" "}
            <a href="/login" style={{color:"#a100ff", fontWeight:"600", textDecoration:"none"}}>Sign in</a>
          </p>

          <p style={{textAlign:"center", fontSize:"11px", color:"#bbb", marginTop:"24px"}}>
            © 2024 SoftMania. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}