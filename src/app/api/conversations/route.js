import dbConnect from '@/lib/dbConnect';
import Conversation from '@/models/conversation.model';
import { NextResponse } from 'next/server';

export async function GET() {
  await dbConnect();

  try {
    const conversations = await Conversation.find({ userId: 'admin' }).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: conversations });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function POST(req) {
  await dbConnect();

  try {
    const body = await req.json();
    const conversation = await Conversation.create({ ...body, userId: 'admin' });
    return NextResponse.json({ success: true, data: conversation }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
