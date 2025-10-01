// pages/Login.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const usuario = JSON.parse(localStorage.getItem("usuario"));

    if (usuario && usuario.email === email && usuario.senha === senha) {
      localStorage.setItem("logado", "true");
      alert(`Bem-vindo, ${usuario.nome}!`);
      navigate("/dashboard");
    } else {
      alert("E-mail ou senha incorretos!");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Login</h2>
        <form onSubmit={handleLogin} style={styles.form}>
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            required
          />
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            style={styles.input}
            required
          />
          <button type="submit" style={styles.button}>
            Entrar
          </button>
        </form>
        <p style={styles.footer}>
          Não tem conta? <Link to="/cadastro">Criar conta</Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: { display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", padding: "1rem", background: "#f0f2f5" },
  card: { background: "#fff", padding: "2rem", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", width: "100%", maxWidth: "400px", textAlign: "center" },
  title: { marginBottom: "1.5rem", fontSize: "1.8rem", fontWeight: "bold", color: "#333" },
  form: { display: "flex", flexDirection: "column", gap: "1rem" },
  input: { width: "100%", padding: "0.8rem", border: "1px solid #ccc", borderRadius: "6px", fontSize: "1rem" },
  button: { width: "100%", padding: "0.9rem", border: "none", borderRadius: "6px", background: "#4CAF50", color: "white", fontSize: "1rem", cursor: "pointer" },
  footer: { marginTop: "1rem", fontSize: "0.9rem", color: "#555" },
};
