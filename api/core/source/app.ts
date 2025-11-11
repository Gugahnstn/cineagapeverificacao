import express, { Request, Response } from "express";
import cors from "cors";

const app = express();

const corsOptions = {
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Endpoint /dados com tipagem TypeScript
app.get("/dados", async (req: Request, res: Response) => {
  const nome = req.query.name as string; // assume que o query param é 'name'

  try {
    const webAppUrl = process.env.WEBURL_API;
    if (!webAppUrl) {
      return res.status(500).json({ error: "WEBURL_API não configurado" });
    }

    const response = await fetch(`${webAppUrl}?name=${encodeURIComponent(nome)}`);
    const data = await response.json();

    res.json(data);
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
    res.status(500).json({ error: "Erro ao buscar dados do Google Script" });
  }
});

export { app };