import { NextResponse } from 'next/server';
import { Client } from '@notionhq/client';

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const databaseId = process.env.NOTION_WAITLIST_DATABASE_ID!;

export async function POST(req: Request) {
  const { email, waitlist_project_code } = await req.json();

  if (!email || !waitlist_project_code) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  try {
    await notion.pages.create({
      parent: { database_id: databaseId },
      properties: {
        Email: {
          title: [
            {
              text: { content: email },
            },
          ],
        },
        'Waitlist Project Code': {
          rich_text: [
            {
              text: { content: waitlist_project_code },
            },
          ],
        },
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Notion error:', error);
    return NextResponse.json({ error: 'Failed to add to Notion' }, { status: 500 });
  }
}
