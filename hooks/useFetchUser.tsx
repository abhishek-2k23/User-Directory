import { useDispatch } from "react-redux";
import { fetchUser } from "@/api/fetchUser";
import { addUser, setInfiniteLoader, setLoader } from "@/redux/slice/userSlice";

const useFetchUser = () => {
  const dispatch = useDispatch();

  const fetchAndStoreUsers = async (firstCall: boolean) => {
    firstCall ? dispatch(setLoader(true)) : dispatch(setInfiniteLoader(true)) // Set loading state to true

    try {
      const users = await fetchUser(); // Fetch user data
      if (Array.isArray(users)) {
        dispatch(addUser(users)); // Add users to the store
      } else {
        console.error("Invalid data format received from fetchUser:", users);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      firstCall ? dispatch(setLoader(false)) : dispatch(setInfiniteLoader(false)) // Stop loading state
    }
  };

  return fetchAndStoreUsers; // Return the fetch function for invocation
};

export default useFetchUser;
