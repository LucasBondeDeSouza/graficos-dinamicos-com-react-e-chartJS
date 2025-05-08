import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import cors from "cors"
import VendaMensal from "./VendaMensal.js"

dotenv.config()

const app = express()
const PORT = 3000

app.use(cors())
app.use(express.json())

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('Conectado ao MongoDB')
    } catch (err) {
        console.log('Deu erro ao conectar com o MongoDB', err)
    }
}

connectDB()

// CREATE
app.post("/vendas", async (req, res) => {
    try {
        const novaVendaMensal = await VendaMensal.create(req.body)
        res.json(novaVendaMensal)
    } catch (err) {
        res.json(err)
    }
})

// READ
app.get("/vendas", async (req, res) => {
    try {
        const vendasMensais = await VendaMensal.find()
        res.json(vendasMensais)
    } catch (err) {
        res.json(err)
    }
})

// DELETE
app.delete("/vendas/:id", async (req, res) => {
    try {
        const vendaMensalExcluida = await VendaMensal.findByIdAndDelete(req.params.id)
        res.json(vendaMensalExcluida)
    } catch (err) {
        res.json(err)
    }
})

app.listen(PORT, () => {
    console.log(`O servidor está rodando na porta ${PORT}`)
})