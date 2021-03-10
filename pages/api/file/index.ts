import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import fs from 'fs';

const outputFolderName = './public/uploads';

const apiRoute = nextConnect({
  onError(error, _: NextApiRequest, res: NextApiResponse) {
    res
      .status(501)
      .json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req: NextApiRequest, res: NextApiResponse) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.get((_: NextApiRequest, res: NextApiResponse) => {
  let rawdata = fs.readFileSync(outputFolderName + '/state_init.json', '');
  let initData = JSON.parse(rawdata);

  res.json({ data: initData });
});

export const config = {
  api: {
    bodyParser: true, // Disallow body parsing, consume as stream
  },
};

export default apiRoute;
