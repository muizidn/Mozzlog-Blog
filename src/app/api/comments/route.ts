import { NextRequest, NextResponse } from 'next/server';
import { getErrorMessage } from '@/utils/get-error-message';
import repo from '@/repositories/comment';
import axios from 'axios';
import { v4 as uuidv4, parse as parseUuid } from 'uuid';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
    const slug = req.nextUrl.searchParams.get('slug') as string;
  try {
    const comments = await repo.loadComments(slug);

    return NextResponse.json({ comments: comments });
  } catch (e) {
    return NextResponse.json({ error: getErrorMessage(e) }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
    const { github_profile, comment, slug } = await req.json();
    try {
        const username = (github_profile as string).replace('https://github.com/', '');

        const apiUrl = `https://api.github.com/users/${username}`;

        const githubProfile = await axios
            .get(apiUrl, {
                headers: {
                    Accept: 'application/vnd.github.v3+json',
                },
            }).then((response) => response.data)

        const commentObject = {
            id: uuidv4(),
            author: githubProfile.name,
            avatar: githubProfile.avatar_url,
            date: (new Date()).toISOString(),
            content: comment,
            githubProfile: github_profile,
        }

        await repo.saveComment(slug, commentObject)

        return NextResponse.json(commentObject);
    } catch (e) {
        return NextResponse.json({ error: getErrorMessage(e) }, { status: 500 });
    }
}