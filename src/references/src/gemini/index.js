import { GoogleGenAI } from "@google/genai";
import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';


// Initialize the Google AI client. 
// The library automatically finds the GEMINI_API_KEY in your .env.local file.
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(request) {
  // const body = await request.json();
  // const userInput = body.message;
  
  try {
    // Get the user's message (this is the same)
    const { message } = await request.json();
    
      if (!message) {
        return NextResponse.json({ error: 'Message is required' }, { status: 400 });
      }

  // Select the model (this is the same)
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash",
    config: {
      thinkingConfig :{
        thinkingBudget : 0,
      }
    },
   });

  // Get the stream from the AI (this is the same)
  const result = await model.generateContentStream([message]);

  // --- NEW STRATEGY STARTS HERE ---

  // 1. Create a new, empty ReadableStream that we control.
  //    This is the stream we will send back to the browser.
  const stream = new ReadableStream({
    async start(controller) {
      // 2. The `start` function runs as soon as the stream is created.
      //    We can now loop over the stream from the Google AI.
      //    The `for await...of` loop is the correct way to read from an AsyncGenerator.
      for await (const chunk of result.stream) {
        // 3. For each chunk we get from the AI, we extract the text.
        const text = chunk.text();
        
        // 4. We "enqueue" (add) that text into our own stream that's going to the browser.
        //    We need to encode it into a format browsers understand (Uint8Array).
        const encoder = new TextEncoder();
        controller.enqueue(encoder.encode(text));
      }

      // 5. Once the loop is finished, it means the AI is done sending data.
      //    We must close our stream to signal the end to the browser.
      controller.close();
    },
  });

  // 6. Finally, we return a new Response, sending our custom stream back.
  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });

} catch (error) {
  // Your error handling is perfect.
  console.error("--- Google AI API Error ---", error);
  return NextResponse.json(
    { error: "Failed to get response from AI." },
    { status: 500 }
  );
} 
}
