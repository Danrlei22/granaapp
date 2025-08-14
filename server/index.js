import express from "express";
import pool from "./db.js";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

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

app.post("/entries", async (req, res) => {
  try {
    const { amount, category, description, date } = req.body;

    const result = await pool.query(
      "INSERT INTO entries (amount, category, description, date) VALUES ($1, $2, $3, $4) RETURNING *",
      [amount, category, description, date]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Erro ao adicionar entry" });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server rodando na porta ${PORT}`));
