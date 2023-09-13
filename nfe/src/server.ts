import express from "express";
import "dotenv/config";
import { router } from "./infra/routes";

const app = express()

app.use(express.json())
app.use(router)

const PORT = process.env.PORT || 3334

app.listen(PORT, () => {
  console.log(`NFe server started on port ${PORT}`)
})