import axios from 'axios';
import crypto from 'crypto';

export default async function handler(req: any, res: any) {
    const elibri_private_key: string =
        process.env.NEXT_PUBLIC_ELIBRI_PRIVATE_KEY || '';
    if (req.method === 'POST') {
        const { record_reference, formats, visible_watermark, price, email } =
            req.body;

        const stamp = Math.floor(Date.now() / 1000); // Временная метка в секундах
        const hmac = crypto
            .createHmac('sha1', elibri_private_key)
            .update(stamp.toString())
            .digest('base64');
        const sig = encodeURIComponent(hmac);

        const elibri_public_key = process.env.NEXT_PUBLIC_ELIBRI_PUBLIC_KEY;

        const payload = {
            record_reference,
            formats,
            visible_watermark,
            price,
            stamp,
            sig,
            token: elibri_public_key,
        };

        try {
            const response = await axios.post(
                'https://w2.elibri.com.ua/watermarking/watermark',
                payload
            );
            res.status(200).json(response.data);
        } catch (error) {
            console.error(error);
            res.status(error || 500).json({ error });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
