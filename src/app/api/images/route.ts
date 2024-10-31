import { NextResponse } from "next/server";

export async function GET() {
  const collections = await fetch(
    "https://api.pexels.com/v1/collections?page=1",
    {
      method: "GET",
      headers: {
        Authorization: `${process.env.PEXELS_API_KEY}`,
      },
    }
  );

  const data = await collections.json();

  let images: unknown[] = [];

  for (let i = 0; i < data.collections.length; i++) {
    const collection = await fetch(
      `https://api.pexels.com/v1/collections/${data.collections[i].id}?page=1&sort=desc`,
      {
        method: "GET",
        headers: {
          Authorization: `${process.env.PEXELS_API_KEY}`,
        },
      }
    );

    const collectionData = await collection.json();

    images = [...images, ...collectionData.media];
  }

  return NextResponse.json({ message: "cari apa?", images });
}
