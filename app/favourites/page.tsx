import getCurrentUser from "../actions/getCurrentUser";
import getFavouriteListings from "../actions/getFavouriteListings";
import EmptyState from "../components/EmptyState";
import FavouritesClient from "./FavouritesClient";

const Favourites = async () => {
  const listings = await getFavouriteListings();
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return (
      <EmptyState
        title="No Favourites found!"
        subtitle="Looks like you have no favourite listings."
      />
    );
  }

  return <FavouritesClient listings={listings} currentUser={currentUser} />;
};
export default Favourites;
