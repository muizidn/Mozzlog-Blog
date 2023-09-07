import { NextRequest, NextResponse } from 'next/server';
import { getErrorMessage } from '@/utils/get-error-message';
import getUpdatedOrNewPosts from '@/services/getOrUpdateNewPosts';
import repo from '@/repositories/post';
import axios from 'axios';
import { v4 as uuidv4, parse as parseUuid } from 'uuid';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
    const { github_profile, comment } = await req.json();
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
            date: (new Date()).toDateString(),
            content: comment,
            githubProfile: github_profile,
        }

        return NextResponse.json(commentObject);
    } catch (e) {
        return NextResponse.json({ error: getErrorMessage(e) }, { status: 500 });
    }
}