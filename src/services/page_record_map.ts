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
        console.log("READ RECORD MAP");
    }
    if (recordMap === null) {
        const recordMapRaw = await getPageRawRecordMap(post.id);
        recordMap = recordMapRaw.recordMap;
        console.log("FETCH RECORD MAP");
    }
    const extendedRecordMap = recordMap as unknown as ExtendedRecordMap;
    if (process.env.NODE_ENV === 'development') {
        saveRecordMapToDatabase(post.id, recordMap);
        console.log("SAVE RECORD MAP");
    }
    return extendedRecordMap
}