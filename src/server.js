import express from "express";
import cors from 'cors';
import dayjs from 'dayjs'

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

app.listen(4000, () => {
    console.log("Servidor Rodando na porta 4000!");
});