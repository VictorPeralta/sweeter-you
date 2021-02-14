import config from "./../config";

export async function GetPresignedPutURL(fileType: string): Promise<string> {
  const res = await fetch(`${config.baseUrl}/putS3Url?fileType=${fileType}`);
  if (res.status !== 200) throw new Error("Something went wrong");
  const data = await res.json();
  return data.body;
}

export async function UploadPublicFileToS3(file: File): Promise<string> {
  try {
    const fileSections = file.name.split(".");
    const fileType = fileSections[fileSections.length - 1];
    const presignedUrl = await GetPresignedPutURL(fileType);

    const res = await fetch(presignedUrl, {
      method: "PUT",
      body: file,
      headers: { "Content-Type": fileType, "x-amz-acl": "public-read" },
    });

    if (res.status !== 200) throw new Error("Something went wrong");
    return presignedUrl.split("?")[0];
  } catch (error) {
    console.log(error);
    throw error;
  }
}
