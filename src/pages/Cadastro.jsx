// pages/Cadastro.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Cadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const navigate = useNavigate();

  const handleCadastro = (e) => {
    e.preventDefault();

    // validações
    if (!email.includes("@")) {
      alert("Digite um e-mail válido!");
      return;
    }
    if (senha.length < 6) {
      alert("A senha deve ter pelo menos 6 caracteres!");
      return;
    }
    if (senha !== confirmarSenha) {
      alert("As senhas não coincidem!");
      return;
    }

    // salvar no localStorage
    const novoUsuario = { nome, email, senha };
    localStorage.setItem("usuario", JSON.stringify(novoUsuario));

    alert("Conta criada com sucesso! Agora faça login.");
    navigate("/"); // redireciona para login
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Criar Conta</h2>
        <form onSubmit={handleCadastro}>
          <input
            type="text"
            placeholder="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            style={styles.input}
            required
          />
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
          <input
            type="password"
            placeholder="Confirmar Senha"
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
            style={styles.input}
            required
          />
          <button type="submit" style={styles.button}>
            Cadastrar
          </button>
        </form>
        <p style={{ marginTop: "10px" }}>
          Já tem conta? <Link to="/">Fazer login</Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: { display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", background: "#f0f2f5" },
  card: { background: "#fff", padding: "2rem", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", width: "320px", textAlign: "center" },
  input: { width: "100%", padding: "0.7rem", marginBottom: "1rem", border: "1px solid #ccc", borderRadius: "6px" },
  button: { width: "100%", padding: "0.8rem", border: "none", borderRadius: "6px", background: "#4CAF50", color: "white", fontSize: "1rem", cursor: "pointer" },
};
