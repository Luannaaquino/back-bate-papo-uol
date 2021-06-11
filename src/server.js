import express from "express";
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

app.post('/participants', (req,res) =>{
    console.log(req.body);
    res.sendStatus(200)
})

app.listen(4000, () => {
    console.log("Servidor Rodando na porta 4000!")
});