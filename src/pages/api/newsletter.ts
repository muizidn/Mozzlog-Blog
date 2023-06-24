import { NextApiRequest, NextApiResponse } from 'next';
import Mixpanel from 'mixpanel';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'POST') {
        return res.status(404);
    }

    var mixpanel = Mixpanel.init(process.env.MIXPANEL_TOKEN!);
    mixpanel.track("Subscribe Newsletter", {
        "email": JSON.parse(req.body).email
    })


    return res.status(201).json({ message: 'Success' });

}
