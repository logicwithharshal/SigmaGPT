import Groq from 'groq-sdk';
import 'dotenv/config'

const client = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

const response = await client.chat.completions.create({
    model: 'llama-3.3-70b-versatile',
    messages: [
        { role: 'user', content: 'Difference Between SQL and MongoDB' }
    ],
});

console.log(response.choices[0].message.content);