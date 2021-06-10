import express from "express";
import cors from 'cors';

const app = express();


app.listen(4000, () => {
    console.log("Servidor Rodando na porta 4000!")
});