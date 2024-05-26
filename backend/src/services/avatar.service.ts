import AWS from 'aws-sdk';
import { DO_SPACES_ENDPOINT, DO_SPACES_KEY, DO_SPACES_NAME, DO_SPACES_REGION, DO_SPACES_SECRET } from '../env';
import { Agent } from 'https';

const spacesEndpoint = new AWS.Endpoint(DO_SPACES_ENDPOINT as string);
const s3 = new AWS.S3({
  endpoint: spacesEndpoint,
  accessKeyId: DO_SPACES_KEY,
  secretAccessKey: DO_SPACES_SECRET,
  region: DO_SPACES_REGION,
  httpOptions: {
    agent: new Agent({ rejectUnauthorized: false })
  }
});

export const uploadAvatar = async (fileName: string, fileContent: Buffer) => {
  const params = {
    Bucket: DO_SPACES_NAME,
    Key: fileName,
    Body: fileContent,
    ACL: "public-read"
  };

  const data = await s3.upload(params).promise();
  return data.Location;
}
