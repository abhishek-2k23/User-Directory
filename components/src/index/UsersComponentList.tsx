import React from "react";
import { FlatList } from "react-native";
import { shallowEqual, useSelector } from "react-redux";
import UserComponent from "./UserComponent";
import { useRouter } from "expo-router";
import useFetchUser from "@/hooks/useFetchUser";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";

const UsersComponentList = () => {
  const { usersShortInfo, infiniteLoader } = useSelector(
    (state: any) => ({
      usersShortInfo: state.users.usersShortInfo,
      infiniteLoader: state.users.infiniteLoader,
    }),
    shallowEqual
  );
  const fetchAndStoreUsers = useFetchUser();

  const router = useRouter(); // Hook to handle navigation

  const handleEndReached = async () => {
    if (!infiniteLoader) {
      await fetchAndStoreUsers(false); // Fetch more data - false because it is for inifinite scroll not first call
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
      renderItem={({ item,index }) => (
        <UserComponent
          name={item?.name}
          email={item?.email}
          itemNo = {index+1}
          onPress={() => handleUserPress(item?.id)} // Navigate on user press
        />
      )}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ gap: 16 }}
      onEndReached={handleEndReached}
      ListFooterComponent={() =>
        infiniteLoader && (
          <ThemedView>
            <ThemedText>Loading more data...</ThemedText>
          </ThemedView>
        )
      }
    />
  );
};

export default UsersComponentList;
