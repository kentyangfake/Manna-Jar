import { Configuration, OpenAIApi } from "openai";
import { OPEN_AI_KEY } from './config.js';

const configuration = new Configuration({
  apiKey: OPEN_AI_KEY,
});

export const openAI = {
  async summerize() {
    const openai = new OpenAIApi(configuration);
    const prompt = 'Hello!!';
    const res = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{role:'user',content:prompt}],
    });
    console.log(res.data.choices[0].message.content);
  }
}