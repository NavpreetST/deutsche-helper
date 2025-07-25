import { GoogleGenAI } from "@google/genai";
import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';


// Initialize the Google AI client. 
// The library automatically finds the GEMINI_API_KEY in your .env.local file.
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(request) {
  const body = await request.json();
  const userInput = body.message;

  if (!userInput) {
    return NextResponse.json({ error: 'Message is required' }, { status: 400 });
  }

  try {
    // Select the model
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-pro' });

    // Generate content
    const result = await model.generateContent(userInput);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ reply: text });

  } catch (error) {
    // Log the detailed error to the server console
    console.error("--- Google AI API Error ---", error);
    
    // Send a generic error response to the client
    return NextResponse.json(
      { error: "Failed to get response from AI." },
      { status: 500 }
    );
  }
}


// const ai = new GoogleGenAI({});

// async function main() {
//   const response = await ai.models.generateContent({
//     model: "gemini-2.5-flash",
//     contents: "Explain how AI works in a few words",
    
//   });
//   console.log(response.text);
// }

// await main();