import type { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import fs from "fs/promises";
import { s3 } from "../../util/s3";
import { randomId } from "../../util/misc";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return;

  const form = formidable({ multiples: true });
  const data = (await new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject({ err });
      resolve({ err, fields, files });
    });
  })) as any;

  const file = data.files.file;
  if (file.size === 0 || !(file.mimetype as string).startsWith("image/"))
    res.status(400).json({ err: "Invalid file" });

  const fileName = `${randomId(5)}${file.originalFilename}`;
  const fileData = await fs.readFile(file.filepath);

  await s3
    .putObject({
      Body: fileData,
      Bucket: process.env.BUCKET_NAME || "",
      Key: fileName,
      ContentType: file.mimetype,
      ACL: "public-read",
    })
    .promise();
  res.status(200).json({ success: true, fileName });
}
