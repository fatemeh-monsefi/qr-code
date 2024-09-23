import connectDb from "@/db/mongodbConnection";
import Link from "@/models/link";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
  try {
    await connectDb();
    const { id } = params;
    const linkById = await Link.findOne({ id });

    const deletedLink = await Link.findByIdAndDelete(linkById);

    if (!deletedLink) {
      return NextResponse.json(
        { message: "Link not found or already deleted" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Link deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Could not delete link" });
  }
}

export async function PATCH(req, { params }) {
  try {
    await connectDb();
    const { id } = params;
    const { link } = await req.json();
    const linkById = await Link.findOne({ id });
    const updatedLink = await Link.findByIdAndUpdate(linkById, {
      link: link,
    });

    if (!updatedLink) {
      return NextResponse.json({ message: "Link not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Link updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Could not edit link" });
  }
}
