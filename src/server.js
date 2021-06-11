import express from "express";
import cors from 'cors';
import dayjs from 'dayjs';
import fs from 'fs'

const app = express();
app.use(express.json());
app.use(cors());

let participants = [];
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

app.get('/messages', (req,res)=>{
    const limit = +req.query.limit; //rever
    const user = req.headers.user;
    const filteredMessages = messages.filter((m) => {
        return (m.type === "message" || m.to === "Todos" || m.to === user || m.from === user);
    });
    const lastMessages = filteredMessages.filter((m,i)=> i > messages.length - limit);
    console.log(lastMessages)
    res.send(lastMessages)
});

app.post("/status", (req, res) =>{
    const user = req.header("User");
    console.log(user);
    for (let i = 0; i < participants.length; i++){
        if(participants[i].name.includes(user)){
            participants[i].lastStatus = Date.now();
            res.sendStatus(200);
            
        } else{
            res.sendStatus(400);
        }
    }
})

function KickInative (){
    participants = participants.filter(participant => {
        const now = Date.now();
        const status = now - participants.lastStatus

        if(status < 10000){
            return true;
        }else {
            const time = dayjs().format("HH:mm:ss");
            const inative = {from: participants.name, to: 'Todos', text: 'sai da sala...', type: 'status', time}
            messages.push(inative);

            return false;
        }
    })
}
setInterval(KickInative, 15000)


app.listen(4000, () => {
    console.log("Servidor Rodando na porta 4000!");
});