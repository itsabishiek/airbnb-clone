import getCurrentUser from "../actions/getCurrentUser";
import getFavouriteListings from "../actions/getFavouriteListings";
import FavouritesClient from "./FavouritesClient";

const Favourites = async () => {
  const listings = await getFavouriteListings();
  const currentUser = await getCurrentUser();

  return <FavouritesClient listings={listings} currentUser={currentUser} />;
};
export default Favourites;
