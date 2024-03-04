import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { AWSS3_REGION, AWSS3_BUCKET_NAME } from "@/constants";

const s3Client = new S3Client({
  region: AWSS3_REGION,
  credentials: {
    accessKeyId: process.env.AWSS3_ACCESS_KEY,
    secretAccessKey: process.env.AWSS3_SECRET_KEY,
  },
});

export async function uploadFile({ Body, Key, ContentType, Dir }) {
  const bytes = await Body.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const command = new PutObjectCommand({
    Bucket: AWSS3_BUCKET_NAME,
    Body: buffer,
    Key: `${Dir}/${Key}`,
    ContentType,
  });

  try {
    const res = await s3Client.send(command);
    console.log(res);
  } catch (error) {
    console.log(error);
  }
}
