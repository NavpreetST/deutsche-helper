// In src/app/api/chat/route.js

import { NextResponse } from 'next/server';

const api = process.env.GEMINI_API;
// This function will be called when a POST request is made to /api/chat
export async function POST(request) {
  try {
    // 1. Read the request body to get the user's message
    const body = await request.json();
    const { message } = body; // Destructure to get the message string

    // Basic validation: Make sure the message exists
    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // 2. Do "backend work" (for now, we just create a reply)
    const botReply = `I am a bot. I received your message: "${message}"`;

    // 3. Send the response back to the frontend
    return NextResponse.json({ reply: botReply });

  } catch (error) {
    // If anything goes wrong, send a 500 error
    console.error('Error in chat API:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}