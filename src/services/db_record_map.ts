import { RecordMap } from 'notion-types';
import fs from 'fs';
import { join } from 'path';

// https://bobbyhadz.com/blog/typescript-write-to-a-file

export async function saveRecordMapToDatabase(id: string, recordMap: RecordMap) {
    const json = JSON.stringify(recordMap);
    syncWriteFile(id, json)
}

export async function readRecordMapFromDatabase(id: String): Promise<RecordMap | null> {
    const filepath = join(process.env.PWD || '', `cache/notion_records/${id}.json`)
    if (!fs.existsSync(filepath)) { return null;}
    const contents = fs.readFileSync(filepath, 'utf-8');
    const json = JSON.parse(contents);
    return json as unknown as RecordMap;
}

// ✅ write to file SYNCHRONOUSLY
function syncWriteFile(id: string, data: any) {
    /**
     * flags:
     *  - w = Open file for reading and writing. File is created if not exists
     *  - a+ = Open file for reading and appending. The file is created if not exists
     */
    const filepath = join(process.env.PWD || '', `cache/notion_records/${id}.json`)
    fs.writeFileSync(filepath, data, {
        flag: 'w',
    });
}
