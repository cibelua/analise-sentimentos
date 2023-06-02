require('dotenv').config()
const express = require('express')
const { Configuration, OpenAIApi } = require('openai')

const { OPENAI_API_KEY2, OPENAI_API_KEY, PORT } = process.env

const configuration = new Configuration({
    apiKey: OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
const cors = require('cors');
const app = express()
app.use(express.json())

app.use(cors({
    origin: '*'
}));


// GET localhost:4000/hello -> {"mensagem": "Hello direto do Back-endnpm,"}
app.get('/hello', (req, res) => {
    res.json({ mensagem: "Hello direto do Back end" })
})

// POST localhost:4000/sentimentos
app.post('/question', (req, res) => {
    const { texto } = req.body

    openai.createCompletion({
            model: 'text-davinci-003',
            prompt: `Diga qual o sentimento associado ao seguinte texto usando apenas uma palavra (Positivo, Negativo ou Neutro): ${texto}`,
            max_tokens: 100,
        })
        .then(chatGPTResponse => {
            res.json({ resposta: chatGPTResponse.data.choices[0].text })
        })
})

const porta = PORT || 4000

app.listen(porta, () => console.log(`Servidor OK. Porta ${porta}`))