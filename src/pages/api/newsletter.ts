import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'POST') {
        return res.status(404);
    }

    console.log(JSON.parse(req.body).email)
    return res.status(201).json({ message: 'Success' });

}
