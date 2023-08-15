import getCurrentUser from "../actions/getCurrentUser";
import getListings from "../actions/getListings";
import EmptyState from "../components/EmptyState";
import PropertiesClient from "./PropertiesClient";

const Properties = async () => {
  const currentUser = await getCurrentUser();
  const listings = await getListings({ userId: currentUser?.id });

  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please login" />;
  }

  if (listings.length === 0) {
    return (
      <EmptyState
        title="No properties found!"
        subtitle="Looks like you have no properties."
      />
    );
  }

  return <PropertiesClient currentUser={currentUser} listings={listings} />;
};
export default Properties;
