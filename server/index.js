import express from "express";
import pool from "./db.js";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/entries", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM entries ORDER BY date DESC");

    const formattedEntries = result.rows.map((entry) => ({
      ...entry,
      date: entry.date.toISOString().split("T")[0], // YYYY/MM/DD
      amount: Number(entry.amount),
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

app.put("/entries/:id", async (req, res) => {
  const { id } = req.params;
  const { amount, category, description, date } = req.body;

  try {
    const result = await pool.query(
      "UPDATE entries SET amount = $1, category = $2, description = $3, date = $4 WHERE id = $5 RETURNING *",
      [amount, category, description, date, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Entry não encontrada" });
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao atualizar entry" });
  }
});

app.delete("/entries/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query("DELETE FROM entries WHERE id = $1", [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Entry não encontrada" });
    }

    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao deletar entry" });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server rodando na porta ${PORT}`));
