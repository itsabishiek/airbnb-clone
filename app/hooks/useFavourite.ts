import { useRouter } from "next/navigation";
import { SafeUser } from "../types";
import useLoginModal from "./useLoginModal";
import { useCallback, useMemo } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

interface IUseFavourite {
  listingId: string;
  currentUser?: SafeUser | null;
}

const useFavourite = ({ listingId, currentUser }: IUseFavourite) => {
  const loginModal = useLoginModal();
  const router = useRouter();

  const hasFavourited = useMemo(() => {
    const list = currentUser?.favoriteIds || [];

    return list.includes(listingId);
  }, [currentUser, listingId]);

  const toggleFavourite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      if (!currentUser) {
        return loginModal.onOpen();
      }

      try {
        let request;

        if (hasFavourited) {
          request = () => axios.delete(`/api/favourites/${listingId}`);
        } else {
          request = () => axios.post(`/api/favourites/${listingId}`);
        }

        await request();
        router.refresh();
        toast.success("Added to your favourites!");
      } catch (error) {
        toast.error("Something went wrong!");
      }
    },
    [currentUser, hasFavourited, listingId, loginModal, router]
  );

  return {
    hasFavourited,
    toggleFavourite,
  };
};

export default useFavourite;
