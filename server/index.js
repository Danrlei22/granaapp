import express from "express";
import cors from "cors";
import entryRoutes from "./routes/entry.js";
import exitRoutes from "./routes/exits.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/entries", entryRoutes);
app.use("/exits", exitRoutes);

const PORT = process.env.PORT || 5000; //5000
app.listen(PORT, () => console.log(`Server rodando na porta ${PORT}`));
