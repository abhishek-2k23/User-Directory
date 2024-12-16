import React, { useRef } from "react";
import { FlatList } from "react-native";
import { useSelector } from "react-redux";
import UserComponent from "./UserComponent";
import { useRouter } from "expo-router";
import useFetchUser from "@/hooks/useFetchUser";
import Loader from "../Loader";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";

const UsersComponentList = () => {
  const { usersShortInfo, loader } = useSelector((store: any) => store.users);
  const fetchAndStoreUsers = useFetchUser();

  const router = useRouter(); // Hook to handle navigation
  const onEndReachedCalledDuringMomentum = useRef(false); // Prevent redundant calls

  const handleEndReached = async () => {
    if (!loader && !onEndReachedCalledDuringMomentum.current) {
      onEndReachedCalledDuringMomentum.current = true;
      await fetchAndStoreUsers(); // Fetch more data
      onEndReachedCalledDuringMomentum.current = false;
    }
  };

  const handleUserPress = (userId: string) => {
    // Navigate to UserDetailsScreen and pass userId as a parameter
    router.push({
      pathname: "/UserDetails",
      params: { id: userId },
    });
  };

  return (
    <FlatList 
      data={usersShortInfo}
      renderItem={({ item }) => (
        <UserComponent
          name={item.name}
          email={item.email}
          id={item.id}
          onPress={() => handleUserPress(item.id)} // Navigate on user press
        />
      )}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ gap: 16 }}
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.5}
      onMomentumScrollBegin={() => {
        onEndReachedCalledDuringMomentum.current = false;
      }}
      ListFooterComponent={() =>
        loader && (
          <ThemedView>
            <ThemedText>Loading more data...</ThemedText>
          </ThemedView>
        )
      }
      maintainVisibleContentPosition={{
        minIndexForVisible: 0,
      }}
    />
  );
};

export default UsersComponentList;
