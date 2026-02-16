
import "dotenv/config";

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  process.exit(1);
}

async function listModels() {
  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    if (data.models) {
      data.models.forEach(m => {
        if (m.name.includes("gemini") && m.name.includes("flash")) {
          console.log(m.name.replace("models/", ""));
        }
      });
    }
  } catch (error) {
    console.error(error);
  }
}

listModels();
