import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "../../../libs/prismadb";

interface IParams {
  listingId?: string;
}

export const POST = async (req: Request, { params }: { params: IParams }) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { listingId } = params;

  if (!listingId || typeof listingId !== "string") {
    throw new Error("Invalid Listing ID!");
  }

  let favouriteIds = [...(currentUser.favoriteIds || [])];

  favouriteIds.push(listingId);

  const user = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      favoriteIds: favouriteIds,
    },
  });

  return NextResponse.json(user);
};

export const DELETE = async (req: Request, { params }: { params: IParams }) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { listingId } = params;

  if (!listingId || typeof listingId !== "string") {
    throw new Error("Invalid ID");
  }

  let favouriteIds = [...(currentUser.favoriteIds || [])];

  favouriteIds = favouriteIds.filter((id) => id !== listingId);

  const user = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      favoriteIds: favouriteIds,
    },
  });

  return NextResponse.json(user);
};
