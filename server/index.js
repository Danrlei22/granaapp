import express from "express";
import pool from "./db.js";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

//Buscar todos os entries
app.get("/entries", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM entries");

    const formattedEntries = result.rows.map((entry) => ({
      ...entry,
      date: entry.date.toISOString().split("T")[0], // YYYY/MM/DD
    }));

    res.json(formattedEntries);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao buscar dados" });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server rodando na porta ${PORT}`));
