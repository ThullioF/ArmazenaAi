import React, { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function Cadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCadastro = (e) => {
    e.preventDefault();

    if (nome.trim().length < 3) {
      toast.error("Digite um nome válido!");
      return;
    }
    if (!email.includes("@")) {
      toast.error("Digite um e-mail válido!");
      return;
    }
    if (senha.length < 6) {
      toast.error("A senha deve ter pelo menos 6 caracteres!");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Conta criada com sucesso!");
      console.log("Novo usuário:", { nome, email, senha });
      setNome("");
      setEmail("");
      setSenha("");
    }, 1200);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Crie sua conta ✨</h2>
        <p style={{ marginBottom: "1.5rem", color: "#555" }}>
          É rápido e fácil!
        </p>

        <form onSubmit={handleCadastro}>
          <input
            type="text"
            placeholder="Nome completo"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            style={styles.input}
          />
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            style={styles.input}
          />

          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? "Cadastrando..." : "Cadastrar"}
          </button>
        </form>

        <p style={styles.footerText}>
          Já tem conta?{" "}
          <Link to="/" style={styles.link}>
            Fazer login
          </Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  ...{
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      background: "linear-gradient(135deg, #81ecec, #74b9ff)",
      padding: "1rem",
    },
    card: {
      background: "#fff",
      padding: "2rem",
      borderRadius: "16px",
      boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
      width: "100%",
      maxWidth: "380px",
      textAlign: "center",
    },
    title: {
      marginBottom: "0.5rem",
      fontWeight: "600",
    },
    input: {
      width: "100%",
      padding: "0.8rem",
      marginBottom: "1rem",
      border: "1px solid #ccc",
      borderRadius: "8px",
      fontSize: "1rem",
      outline: "none",
      transition: "border-color 0.2s ease",
    },
    button: {
      width: "100%",
      padding: "0.9rem",
      border: "none",
      borderRadius: "8px",
      background: "#00b894",
      color: "white",
      fontSize: "1rem",
      cursor: "pointer",
      transition: "background 0.3s ease",
    },
    footerText: {
      marginTop: "1rem",
      fontSize: "0.9rem",
    },
    link: {
      color: "#0984e3",
      textDecoration: "none",
      fontWeight: "500",
    },
  },
};
