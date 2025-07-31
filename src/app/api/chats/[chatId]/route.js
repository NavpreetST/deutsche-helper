import dbConnect from '@/lib/dbConnect';
import Chat from '@/models/chat.model';
import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
  const { chatId } = params;
  await dbConnect();

  try {
    const chat = await Chat.findById(chatId);
    if (!chat) {
      return NextResponse.json({ success: false, error: 'Chat not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: chat });
  } catch (error) {
    console.error("Error fetching chat:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  const { chatId } = params;
  await dbConnect();

  try {
    const body = await req.json();
    const chat = await Chat.findByIdAndUpdate(
      chatId,
      { $push: { messages: body } },
      { new: true, runValidators: true }
    );
    if (!chat) {
      return NextResponse.json({ success: false, error: 'Chat not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: chat });
  } catch (error) {
    console.error("Error updating chat:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}