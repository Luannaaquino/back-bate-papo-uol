import express from "express";
import cors from 'cors';
import dayjs from 'dayjs';
import fs from 'fs'

const app = express();
app.use(express.json());
app.use(cors());

const participants = [];
const messages = [];

app.post('/participants', (req,res) =>{
    const { name } = req.body;

    if(name.length === 0){
        return res.sendStatus(400)
    };

    const user = { name, lastStatus: Date.now()};
    participants.push(user);

    const time = dayjs().format("HH:mm:ss");
    const message =  {from: name, to: 'Todos', text: 'entra na sala...', type: 'status', time};
    messages.push(message);

    console.log(messages);
    res.sendStatus(200)
})

app.get('/participants', (req,res) =>{
    res.send(participants);
});

app.post('/messages', (req,res) =>{
    const {to, text, type} = req.body;
    const from = req.header("User");

    if(text.length === 0 || to.length === 0){
        return res.sendStatus(400)
    }

    if(type !== 'message' && type !== 'private_message'){
        return res.sendStatus(400)
    }

    const participant = participants.find(p => p.name === from);
    if(participant === null){
        return res.sendStatus(400);
    };

    const time = dayjs().format("HH:mm:ss");
    const message = {from, to, text, type, time};
    messages.push(message)

    res.sendStatus(200);
    console.log(message)
})

app.listen(4000, () => {
    console.log("Servidor Rodando na porta 4000!");
});