import express from "express";
import cors from "cors";
import entryRoutes from "./routes/entry.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/entries", entryRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server rodando na porta ${PORT}`));
