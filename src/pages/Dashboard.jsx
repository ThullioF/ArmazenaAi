// pages/Dashboard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  const handleLogout = () => {
    localStorage.removeItem("logado");
    navigate("/");
  };

  if (!localStorage.getItem("logado")) {
    navigate("/");
    return null;
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Bem-vindo, {usuario?.nome}!</h2>
        <p>Você está logado com: {usuario?.email}</p>
        <button onClick={handleLogout} style={styles.button}>
          Sair
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: { display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", background: "#f0f2f5" },
  card: { background: "#fff", padding: "2rem", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", width: "320px", textAlign: "center" },
  button: { marginTop: "1rem", width: "100%", padding: "0.8rem", border: "none", borderRadius: "6px", background: "#e74c3c", color: "white", fontSize: "1rem", cursor: "pointer" },
};
