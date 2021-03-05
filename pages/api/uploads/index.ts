import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import fs from 'fs';
import { ApiResponse } from '../../../model/apiResponse';

type ResponseData = ApiResponse<string[], string>;

const outputFolderName = './public/uploads';

const apiRoute = nextConnect({

  onError(error, req: NextApiRequest, res: NextApiResponse<ResponseData>) {
    res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.post((req: NextApiRequest, res: NextApiResponse<ResponseData>) => {
  var dir = outputFolderName;
  
  if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
  }

  let data = JSON.stringify( req.body, null, 2);
  fs.writeFile(outputFolderName+'/state_'+req.body?.timestamp+'.json', data, function(){});

  const filenames = fs.readdirSync(outputFolderName);
  const images = filenames.map((name) => name);

  res.status(200).json({ data: images, error: req.body});
});

apiRoute.get((_: NextApiRequest, res: NextApiResponse<ResponseData>) => {
    res.json({ data : ["success"] });
})

export const config = {
  api: {
    bodyParser: true, // Disallow body parsing, consume as stream
  },
};

export default apiRoute;
