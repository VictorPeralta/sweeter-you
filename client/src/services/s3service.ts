import config from "./../config";

export async function GetPresignedPutURL(fileType: string): Promise<string> {
  const res = await fetch(`${config.baseUrl}/putS3Url?fileType=${fileType}`);
  if (res.status !== 200) throw new Error("Something went wrong");
  const data = await res.json();
  return data.body;
}
