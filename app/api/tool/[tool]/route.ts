import { NextRequest } from 'next/server';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGO_URI!;
const client = new MongoClient(uri);

export async function GET(req: NextRequest, { params }: { params: { tool: string } }) {
  const toolName = params.tool;
  try {
    await client.connect();
    const db = client.db('skillgo');
    const collection = db.collection('tool_reviews');
    const doc = await collection.findOne({ tool: toolName });
    if (!doc) {
      return new Response(JSON.stringify({ error: 'Not found' }), { status: 404 });
    }
    return new Response(JSON.stringify(doc), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 });
  } finally {
    await client.close();
  }
} 