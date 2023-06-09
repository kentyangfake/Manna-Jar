import { Configuration, OpenAIApi } from "openai";
import { OPEN_AI_KEY } from './config.js';

const configuration = new Configuration({
  apiKey: OPEN_AI_KEY,
});

export const openAI = {
  async summarize(titles, recentNotes) {
    const openai = new OpenAIApi(configuration);
    const prompt = `請根據我最近的筆記,排除html標籤後,以兩句話對我簡短做信仰狀況回顧,
並根據我的筆記標題列表,推薦可複習的幾篇(2-3篇)筆記:
我的筆記標題列表:${titles},
我最近的筆記:${recentNotes},
`;

    const res = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {role:'system',content:'你是牧師'},
        {role:'user',content:prompt},
      ],
    });
    return res.data.choices[0].message.content;
  }
}