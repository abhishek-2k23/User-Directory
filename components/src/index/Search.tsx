import {
  TextInput,
  TouchableOpacity,
  useColorScheme,
  StyleSheet,
  Pressable,
} from "react-native"
import React, { useState } from "react"
import { ThemedView } from "@/components/ThemedView"
import { Ionicons } from "@expo/vector-icons"
import { Colors } from "@/constants/Colors"
import { ThemedText } from "@/components/ThemedText"
import { shallowEqual, useDispatch, useSelector } from "react-redux"
import {
  setSearchScreen,
  setSearchText,
} from "../../../redux/slice/searchSlice"
import { setSearchResult, setSortedResults } from "@/redux/slice/userSlice"

const Search = () => {
  const [text, setText] = useState<string>("")
  const theme = useColorScheme() || "light"
  const dispatch = useDispatch()
  const searchText = useSelector((store: any) => store.search.searchText)
  const { usersShortInfo, infiniteLoader } = useSelector(
    (state: any) => ({
      usersShortInfo: state.users.usersShortInfo,
      infiniteLoader: state.users.infiniteLoader,
    }),
    shallowEqual,
  )
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")

  const onSubmit = () => {
    if (text === "") {
      return
    }
    dispatch(setSearchText(text))
    dispatch(setSearchResult(text))
    dispatch(setSearchScreen(true))
  }

  const onChange = (text: string) => {
    setText(text)
  }

  const handleSortToggle = () => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"))
    dispatch(setSortedResults(sortOrder));
  }

  

  return (
    <ThemedView style={styles.container}>
      <TextInput
        style={[
          styles.textInput,
          {
            borderColor: Colors[theme].text,
            backgroundColor: Colors[theme].cardBackground,
            color: Colors[theme].text,
          },
        ]}
        onChangeText={(text) => onChange(text)}
      ></TextInput>
      <TouchableOpacity onPress={onSubmit}>
        <ThemedView
          style={[styles.searchIconBox, { borderColor: Colors[theme].text }]}
        >
          <Ionicons name="search" size={20} color={Colors[theme].text} />
        </ThemedView>
      </TouchableOpacity>

      {/* Sort Button */}
      <ThemedView style={{}}>
        <Pressable onPress={handleSortToggle}>
          <ThemedText>
            {sortOrder === "asc" ? (
              <Ionicons
                name="arrow-up-circle-outline"
                size={28}
                color={Colors[theme].icon}
              />
            ) : (
              <Ionicons
                name="arrow-down-circle-outline"
                size={28}
                color={Colors[theme].icon}
              />
            )}
          </ThemedText>
        </Pressable>
      </ThemedView>
      
    </ThemedView>
  )
}

export default Search

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  textInput: {
    height: 35,
    flex: 1,
    borderWidth: 1,
    marginVertical: 10,
    borderRadius: 6,
  },
  searchIconBox: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
  },
})
