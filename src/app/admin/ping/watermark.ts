import axios from 'axios';
import crypto from 'crypto';

export default async function handler(req: any, res: any) {
  if (req.method === 'POST') {
    const { record_reference, formats, visible_watermark, price, email } =
      req.body;

    const secret = '1b41d378b24738917d314dff5c816b61';
    const stamp = Math.floor(Date.now() / 1000); // Временная метка в секундах
    const hmac = crypto
      .createHmac('sha1', secret)
      .update(stamp.toString())
      .digest('base64');
    const sig = encodeURIComponent(hmac);

    const payload = {
      record_reference,
      formats,
      visible_watermark,
      price,
      stamp,
      sig,
      token: 'e_wa_97fd26f52e0505e68ec782ea_test',
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
