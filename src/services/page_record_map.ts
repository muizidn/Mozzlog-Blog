import { ExtendedRecordMap } from 'notion-types';
import { getPageRawRecordMap } from '@/libs/notion';
import {
    saveRecordMapToDatabase,
    readRecordMapFromDatabase,
} from '@/services/db_record_map';

export async function getPageRecordMap(postId: string): Promise<ExtendedRecordMap> {
    let recordMap = await readRecordMapFromDatabase(postId);
    if (recordMap === null) {
        const recordMapRaw = await getPageRawRecordMap(postId);
        recordMap = recordMapRaw.recordMap;
    }
    const extendedRecordMap = recordMap as unknown as ExtendedRecordMap;
    saveRecordMapToDatabase(postId, recordMap);
    return extendedRecordMap
}