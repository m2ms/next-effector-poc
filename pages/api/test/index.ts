import { NextApiRequest, NextApiResponse } from 'next';
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  //const headers = req?.cookies;
  var token = req.headers['authorization'];
  res.status(200).json({ text: 'Hello', token: token });
}
