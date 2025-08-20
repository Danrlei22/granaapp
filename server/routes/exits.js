import express from "express";
import pool from "../db.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT *  FROM exits ORDER BY date DESC");

    const formattedExits = result.rows.map((exit) => ({
      ...exit,
      date: exit.date.toISOString().split("T")[0],
      amount: Number(exit.amount),
    }));

    res.json(formattedExits);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Erro ao buscar dados" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { amount, category, description, date } = req.body;

    const result = await pool.query(
      "INSERT INTO exits (amount, category, description, date) VALUES ($1, $2, $3, $4) RETURNING *",
      [amount, category, description, date]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Erro ao adicionar exit" });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { amount, category, description, date } = req.body;

  try {
    const result = await pool.query(
      "UPDATE exits SET amount = $1, category = $2, description = $3, date = $4 WHERE id = $5 RETURNING *",
      [amount, category, description, date, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Exit não encontrada." });
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao atualizar exit." });
  }
});

export default router;
