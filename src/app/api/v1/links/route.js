import { v4 as uuid } from "uuid";
import connectDb from "@/db/mongodbConnection";
import Link from "@/models/link";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectDb();
    const links = await Link.find();

    return new Response(JSON.stringify(links), { status: 200 });
  } catch (error) {
    console.error("Error fetching links:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch links" }), {
      status: 500,
    });
  }
}

export async function POST(req) {
  try {
    await connectDb();

    const { link } = await req.json();
    console.log("Received body:", link);
    const newLink = new Link({ link, id: uuid() });

    const savedLink = await newLink.save();
    console.log(savedLink);

    return NextResponse.json({ message: "link added to database" });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error });
  }
}
