import { NextResponse } from 'next/server';

import { getErrorMessage } from '@/utils/get-error-message';
import getUpdatedOrNewPosts from './getUpdatedOrNewPosts';

export const dynamic = 'force-dynamic';

export async function GET({ query }: { query?: { after?: string } }) {
  try {
    // Parse the 'after' parameter in the query string, e.g., 'dd-MM-yyyy HH:mm:ss'
    var afterTimestamp = null;

    if (query) {
      const { after } = query;
      afterTimestamp = after ? new Date(after) : null;
    }

    const allPosts = await getUpdatedOrNewPosts(afterTimestamp);

    return NextResponse.json({ posts: allPosts });
  } catch (e) {
    return NextResponse.json({ error: getErrorMessage(e) }, { status: 500 });
  }
}
