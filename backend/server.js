// server.js
import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cors from "cors";
import dotenv from "dotenv";
import Usuario from "./models/Usuario.js";

// ✅ carregar variáveis de ambiente do .env
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// conectar ao MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB conectado 🚀"))
  .catch((err) => console.error("❌ Erro ao conectar ao MongoDB:", err));

const SECRET = process.env.JWT_SECRET;

// rota de cadastro
app.post("/cadastro", async (req, res) => {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res.status(400).json({ error: "Preencha todos os campos" });
  }

  const usuarioExistente = await Usuario.findOne({ email });
  if (usuarioExistente) {
    return res.status(400).json({ error: "E-mail já cadastrado" });
  }

  const senhaHash = await bcrypt.hash(senha, 10);

  const novoUsuario = new Usuario({ nome, email, senha: senhaHash });
  await novoUsuario.save();

  res.json({ message: "Usuário cadastrado com sucesso" });
});

// rota de login
app.post("/login", async (req, res) => {
  const { email, senha } = req.body;

  const usuario = await Usuario.findOne({ email });
  if (!usuario) {
    return res.status(400).json({ error: "Usuário não encontrado" });
  }

  const senhaValida = await bcrypt.compare(senha, usuario.senha);
  if (!senhaValida) {
    return res.status(401).json({ error: "Senha incorreta" });
  }

  // gerar token
  const token = jwt.sign({ id: usuario._id }, SECRET, { expiresIn: "1h" });

  res.json({
    message: "Login realizado com sucesso",
    token,
    usuario: { id: usuario._id, nome: usuario.nome, email: usuario.email },
  });
});

// rota protegida
app.get("/perfil", autenticarToken, async (req, res) => {
  const usuario = await Usuario.findById(req.userId).select("-senha");
  res.json(usuario);
});

// middleware de autenticação
function autenticarToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403);
    req.userId = decoded.id;
    next();
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
