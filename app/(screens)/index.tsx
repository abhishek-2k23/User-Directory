import { FlatList, Pressable, StyleSheet, useColorScheme } from "react-native"
import React, { useEffect } from "react"
import { ThemedView } from "@/components/ThemedView"
import { ThemedText } from "@/components/ThemedText"
import { SafeAreaView } from "react-native-safe-area-context"
import { Colors } from "@/constants/Colors"
import useFetchUser from "@/hooks/useFetchUser"
import UsersComponentList from "@/components/src/index/UsersComponentList"
import { useDispatch, useSelector } from "react-redux"
import Loader from "@/components/src/Loader"
import Search from "@/components/src/index/Search"
import SearchedUserDetails from "@/components/src/searchedUserDetails"
import { setSearchScreen } from "@/redux/slice/searchSlice"
import UserComponent from "@/components/src/index/UserComponent"
import { router } from "expo-router"
import { clearSearchResult } from "@/redux/slice/userSlice"

const Home = () => {

  const handleUserPress = (userId: string) => {
      router.push({
        pathname: "/UserDetails",
        params: { id: userId },
      });
    };

    const handleClose = () => {
      dispatch(setSearchScreen(false))
      dispatch(clearSearchResult())
    }
  const theme = useColorScheme() || "light"
  const dispatch = useDispatch()
  const loader = useSelector((store: any) => store.users.loader)
  const searchScreen = useSelector((store: any) => store.search.searchScreen) // Fetch searchScreen state
  const searchResult = useSelector((store: any) => store.users.searchResult) // Fetch search results
  const searchText = useSelector((store: any) => store.search.searchText) // Fetch the searched text
  const fetchAndStoreUsers = useFetchUser()
  useEffect(() => {
    fetchAndStoreUsers(true)
  }, [])

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: Colors[theme].background }]}
    >
      <ThemedView>
        {/* app name  */}
        <ThemedText style={styles.appTitle}> User Directory</ThemedText>

        {/* search box  & filter option icon */}
        <Search />

        {/* user components  */}
        {/* Conditional Rendering */}
        {loader ? (
          <ThemedView style={styles.loaderContainer}>
            <Loader />
          </ThemedView>
        ) : searchScreen ? (
          searchResult?.length > 0 ? (
            <SearchedUserDetails searchResult={searchResult} searchText={searchText} />
          ) : (
            <ThemedView style={{flexDirection: 'row', width: '95%', alignItems: 'center', justifyContent: 'space-between'}}>
              {" "}
              <ThemedText>No Users Exist</ThemedText>{" "}
              <Pressable onPress={() => dispatch(setSearchScreen(false))}>
                <ThemedText>X</ThemedText>
              </Pressable>
            </ThemedView>
          )
        ) : (
          <UsersComponentList />
        )}

      </ThemedView>
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
  },
  appTitle: {
    fontSize: 24,
  },
  textInput: {
    height: 35,
    flex: 1,
    borderWidth: 1,
    marginVertical: 10,
    borderRadius: 6,
  },
  searchBox: {},
  searchIconBox: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
  },
  loaderContainer: {
    width: "100%",
    height: "90%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
})
