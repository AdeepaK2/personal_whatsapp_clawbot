
import "dotenv/config";

const apiKey = process.env.OPENROUTER_API_KEY;
const model = "meta-llama/llama-3-8b-instruct:free";

import fs from "fs";

async function listModels() {
  try {
    const response = await fetch("https://openrouter.ai/api/v1/models");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    // Filter for free models and print their IDs
    const freeModels = data.data.filter(m => m.id.endsWith(":free"));

    const output = {
      freeModels: freeModels.map(m => m.id)
    };

    fs.writeFileSync("openrouter-models.json", JSON.stringify(output, null, 2));
    console.log(`Found ${freeModels.length} free models. Written to openrouter-models.json`);

  } catch (error) {
    console.log("Error:", error.message);
  }
}

listModels();
