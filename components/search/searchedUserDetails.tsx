import React, { useState } from "react"
import { FlatList, Pressable, StyleSheet, View } from "react-native"
import { ThemedText } from "@/components/ThemedText"
import UserComponent from "@/components/index/UserComponent"
import { ThemedView } from "../ThemedView"
import { useDispatch } from "react-redux"
import { setSearchScreen } from "@/redux/slice/searchSlice"
import { router } from "expo-router"
import Loader from "../Loader"
import { clearSearchResult } from "@/redux/slice/userSlice"

const SearchedUserDetails = ({
  searchText,
  searchResult,
}: {
  searchText: string
  searchResult: { id: string; name: string; email: string }[] | null // Updated type to allow null
}) => {
  console.log(searchText, searchResult)
  const dispatch = useDispatch()
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");


  const handleSortToggle = () => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  const sortedResults =
    searchResult?.slice().sort((a, b) => {
      if (sortOrder === "asc") {
        return a.name.localeCompare(b.name); // Ascending order
      }
      return b.name.localeCompare(a.name); // Descending order
    }) || [];


  const handleClose = () => {
    dispatch(setSearchScreen(false)) // Close the search screen
    dispatch(clearSearchResult());
  }

  const handleUserPress = (userId: string) => {
    router.push({
      pathname: "/UserDetails",
      params: { id: userId },
    })
  }

  // If searchResult is null, show loader
  if (searchResult === null) {
    return <Loader />
  }

  return (
    <ThemedView>
      {/* Header */}
      <ThemedView
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: '98%'
        }}
      >
        <ThemedText style={{ marginBottom: 10 }}>
          You searched for: {searchText}
        </ThemedText>

        <Pressable onPress={handleClose}>
          <ThemedText>X</ThemedText>
        </Pressable>
      </ThemedView>


      <FlatList
        data={searchResult}
        renderItem={({ item, index }) => (
          <UserComponent
            name={item?.name}
            email={item?.email}
            itemNo={index + 1}
            onPress={() => handleUserPress(item?.id)}
          />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ gap: 16 }}
        ListEmptyComponent={
          <ThemedText>No users found for "{searchText}"</ThemedText>
        }
      />
    </ThemedView>
  )
}

export default SearchedUserDetails

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
})
