import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchUser } from "@/api/fetchUser";
import { addUser, setLoader } from "@/redux/slice/userSlice";

const useFetchUser = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAndStoreUsers = async () => {
      dispatch(setLoader(true));
      try {
        const users = await fetchUser(); // Await the promise to get actual data
        if (users) {
           dispatch(addUser(users)); // Dispatch each user to Redux store
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
      finally{
        dispatch(setLoader(false));
      }
    };

    fetchAndStoreUsers(); // Call the async function
  }, [dispatch]);
};

export default useFetchUser;
