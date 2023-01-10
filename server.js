import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import { Configuration, OpenAIApi } from 'openai';  

dotenv.config()

const configuration = new Configuration({
    apiKey: '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'
})

const openai = new OpenAIApi(configuration);

const app = express()
app.use(cors())
app.use(express.json())

app.post('/', async (req, res) => {
    try{
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: req.body.input,
            temperature: 0.7,
            max_tokens: 256,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        });

        res.status(200).send({
            bot: response.data.choices[0].text
        })
    }
    catch (error){
        res.status(500).send({error})
    }
})

app.listen(3000, () => console.log("Server is running on port 3000..."));