import { NextResponse } from 'next/server';

import { getAllPosts } from '@/services/posts';
import { getErrorMessage } from '@/utils/get-error-message';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const allPosts = await getAllPosts();
    return NextResponse.json({ posts: allPosts });
  } catch (e) {
    return NextResponse.json({ error: getErrorMessage(e) }, { status: 500 });
  }
}
