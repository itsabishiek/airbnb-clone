import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import EmptyState from "../components/EmptyState";
import TripsClient from "./TripsClient";

const Trips = async () => {
  const currentUser = await getCurrentUser();
  const reservations = await getReservations({ userId: currentUser?.id });

  if (!currentUser) {
    return <EmptyState title="Unauthorized!" subtitle="Please Login." />;
  }

  if (reservations.length === 0) {
    return (
      <EmptyState
        title="No trips found!"
        subtitle="Looks like you have'nt reserved any trips."
      />
    );
  }

  return <TripsClient reservations={reservations} currentUser={currentUser} />;
};
export default Trips;
