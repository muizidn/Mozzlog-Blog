import { NextApiRequest, NextApiResponse } from 'next';
import analytics from './analytics';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'POST') {
        return res.status(404);
    }

    analytics.track("Subscribe Newsletter", {
        "email": JSON.parse(req.body).email
    });
    
    return res.status(201).json({ message: 'Success' });

}
