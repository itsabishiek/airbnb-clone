import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "../../../libs/prismadb";
import { NextResponse } from "next/server";

interface IParams {
  listingId?: string;
}

export const DELETE = async (req: Request, { params }: { params: IParams }) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { listingId } = params;

  if (!listingId || typeof listingId !== "string") {
    throw new Error("Invalid ID");
  }

  const listing = await prisma.listings.deleteMany({
    where: {
      id: listingId,
      userId: currentUser.id,
    },
  });

  NextResponse.json(listing);
};
