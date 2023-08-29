import { ExtendedRecordMap } from 'notion-types';
import { getPageRawRecordMap } from '@/libs/notion';
import {
    saveRecordMapToDatabase,
    readRecordMapFromDatabase,
} from '@/services/db_record_map';

import { Post } from "@/types/post";

export async function getPageRecordMap(post: Post): Promise<ExtendedRecordMap> {
    let recordMap = null;
    if (process.env.NODE_ENV === 'development') {
        recordMap = await readRecordMapFromDatabase(post.id);
    }
    if (recordMap === null) {
        const recordMapRaw = await getPageRawRecordMap(post.id);
        recordMap = recordMapRaw.recordMap;
    }
    const extendedRecordMap = recordMap as unknown as ExtendedRecordMap;
    saveRecordMapToDatabase(post.id, recordMap);
    return extendedRecordMap
}