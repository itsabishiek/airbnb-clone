import ReservationClient from "./ReservationClient";
import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import EmptyState from "../components/EmptyState";

const Reservations = async () => {
  const currentUser = await getCurrentUser();
  const reservations = await getReservations({ authorId: currentUser?.id });

  if (!currentUser) {
    return <EmptyState title="Unauthorised" subtitle="Please login" />;
  }

  if (reservations.length === 0) {
    return (
      <EmptyState
        title="No reservations found"
        subtitle="Looks like you have no reservations on your properties."
      />
    );
  }

  return (
    <ReservationClient currentUser={currentUser} reservations={reservations} />
  );
};
export default Reservations;
