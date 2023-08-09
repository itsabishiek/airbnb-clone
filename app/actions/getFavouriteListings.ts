import getCurrentUser from "./getCurrentUser";
import prisma from "../libs/prismadb";

export default async function getFavouriteListings() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return [];
    }

    const favourites = await prisma.listings.findMany({
      where: {
        id: {
          in: [...(currentUser.favoriteIds || [])],
        },
      },
    });

    const safeFavourites = favourites.map((favourite) => ({
      ...favourite,
      createdAt: favourite.createdAt.toISOString(),
    }));

    return safeFavourites;
  } catch (error: any) {
    throw new Error(error);
  }
}
