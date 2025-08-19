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

export default router;
