import { NextRequest, NextResponse } from 'next/server';
import { getErrorMessage } from '@/utils/get-error-message';
import getUpdatedOrNewPosts from '@/services/getOrUpdateNewPosts';
import repo from '@/repositories/post';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const after = req.nextUrl.searchParams.get('after');
  console.log(after)
  try {
    // Parse the 'after' parameter in the query string, e.g., 'ISODate'
    var afterTimestamp = null;

    if (after) {
      afterTimestamp = after ? new Date(after as string) : null;
    }

    console.log(afterTimestamp)

    const allPosts = await getUpdatedOrNewPosts(afterTimestamp);
    await repo.savePosts(allPosts);

    return NextResponse.json({ posts: allPosts });
  } catch (e) {
    return NextResponse.json({ error: getErrorMessage(e) }, { status: 500 });
  }
}