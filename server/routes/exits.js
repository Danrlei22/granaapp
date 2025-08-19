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

export default router;
