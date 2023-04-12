import { Configuration, OpenAIApi } from "openai";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const configuration = new Configuration({
  organization: "org-uhp3by1J9MPnkHVH8MxRRoTR",
  apiKey: process.env.OPENAI_API_KEY
});
const openai = new OpenAIApi(configuration);
const app = express();
const port = 8000;
app.use(bodyParser.json());
app.use(cors());
app.post("/", async (req, res) => {
  const { message } = req.body
  console.log(message);
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: `${message}`,
      },
    ],
  });
  res.json({
    information : completion.data.choices[0].message
  });

});

app.listen(port,()=>{
    console.log(`http://localhost:${port}`);
})

