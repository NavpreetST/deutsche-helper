import dbConnect from '@/lib/dbConnect';
import Message from '@/models/message.model';
import { NextResponse } from 'next/server';

export async function GET(req) {
  await dbConnect();

  const { searchParams } = new URL(req.url);
  const conversationId = searchParams.get('conversationId');

  try {
    const messages = await Message.find({ conversationId }).sort({ createdAt: 1 });
    return NextResponse.json({ success: true, data: messages });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function POST(req) {
  await dbConnect();

  try {
    const body = await req.json();
    const message = await Message.create(body);
    return NextResponse.json({ success: true, data: message }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
