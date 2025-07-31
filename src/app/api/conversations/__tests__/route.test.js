import { GET, POST } from '@/app/api/conversations/route';
import Conversation from '@/models/conversation.model';
import dbConnect from '@/lib/dbConnect';
import { vi } from 'vitest';

// Mock the models and dbConnect
vi.mock('@/models/conversation.model');
vi.mock('@/lib/dbConnect');

beforeEach(() => {
  vi.clearAllMocks();
});

describe('GET /api/conversations', () => {
  it('should return a list of conversations', async () => {
    const mockConversations = [
      { _id: '1', title: 'Test Chat 1', userId: 'admin' },
      { _id: '2', title: 'Test Chat 2', userId: 'admin' },
    ];

    // Tell our mock what to return
    Conversation.find.mockReturnValue({
      sort: vi.fn().mockResolvedValue(mockConversations),
    });

    const response = await GET();
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.success).toBe(true);
    expect(body.data).toEqual(mockConversations);
    expect(dbConnect).toHaveBeenCalledTimes(1);
    expect(Conversation.find).toHaveBeenCalledWith({ userId: 'admin' });
  });
});

describe('POST /api/conversations', () => {
  it('should create a new conversation', async () => {
    const mockConversation = { _id: '3', title: 'New Test Chat', userId: 'admin' };
    Conversation.create.mockResolvedValue(mockConversation);

    const req = {
      json: async () => ({ title: 'New Test Chat' }),
    };

    const response = await POST(req);
    const body = await response.json();

    expect(response.status).toBe(201);
    expect(body.success).toBe(true);
    expect(body.data).toEqual(mockConversation);
    expect(dbConnect).toHaveBeenCalledTimes(1);
    expect(Conversation.create).toHaveBeenCalledWith({ title: 'New Test Chat', userId: 'admin' });
  });
});
