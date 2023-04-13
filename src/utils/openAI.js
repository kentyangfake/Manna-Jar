import { Configuration, OpenAIApi } from "openai";
import { OPEN_AI_KEY } from './config.js';

const configuration = new Configuration({
  apiKey: OPEN_AI_KEY,
});

export const openAI = {
  async summerize(titles, recentNotes) {
    const openai = new OpenAIApi(configuration);
    const prompt = `請以第一人稱,根據我最近的筆記,以兩句話對我簡短做信仰狀況回顧,
並根據我的筆記列表,推薦我複習的3篇筆記:
我最近的筆記:${recentNotes},
我的筆記列表:${titles},
`;

    const res = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{role:'user',content:prompt}],
    });
    return res.data.choices[0].message.content;
  }
}