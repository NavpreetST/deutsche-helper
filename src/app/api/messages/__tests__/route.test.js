import { GET, POST } from '@/app/api/messages/route';
import Message from '@/models/message.model';
import dbConnect from '@/lib/dbConnect';
import { vi } from 'vitest';

vi.mock('@/models/message.model');
vi.mock('@/lib/dbConnect');

beforeEach(() => {
  vi.clearAllMocks();
});

describe('GET /api/messages', () => {
  it('should return a list of messages for a conversation', async () => {
    const mockMessages = [
      { _id: '1', text: 'Hello', sender: 'user', conversationId: 'conv1' },
      { _id: '2', text: 'Hi', sender: 'bot', conversationId: 'conv1' },
    ];

    Message.find.mockReturnValue({
      sort: vi.fn().mockResolvedValue(mockMessages),
    });

    const req = {
      url: 'http://localhost/api/messages?conversationId=conv1',
    };

    const response = await GET(req);
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.success).toBe(true);
    expect(body.data).toEqual(mockMessages);
    expect(dbConnect).toHaveBeenCalledTimes(1);
    expect(Message.find).toHaveBeenCalledWith({ conversationId: 'conv1' });
  });
});

describe('POST /api/messages', () => {
  it('should create a new message', async () => {
    const mockMessage = { _id: '3', text: 'New Message', sender: 'user', conversationId: 'conv1' };
    Message.create.mockResolvedValue(mockMessage);

    const req = {
      json: async () => ({ text: 'New Message', sender: 'user', conversationId: 'conv1' }),
    };

    const response = await POST(req);
    const body = await response.json();

    expect(response.status).toBe(201);
    expect(body.success).toBe(true);
    expect(body.data).toEqual(mockMessage);
    expect(dbConnect).toHaveBeenCalledTimes(1);
    expect(Message.create).toHaveBeenCalledWith({ text: 'New Message', sender: 'user', conversationId: 'conv1' });
  });
});
