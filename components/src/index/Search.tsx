import {
  TextInput,
  TouchableOpacity,
  useColorScheme,
  StyleSheet,
} from "react-native"
import React from "react"
import { ThemedView } from "@/components/ThemedView"
import { Ionicons } from "@expo/vector-icons"
import { Colors } from "@/constants/Colors"
import { ThemedText } from "@/components/ThemedText"

const Search = () => {
  const theme = useColorScheme() || "light"
  return (
    <ThemedView style={styles.container}>
          <TextInput
            style={[
              styles.textInput,
              { borderColor: Colors[theme].text, color: Colors[theme].text },
            ]}
          ></TextInput>
          <TouchableOpacity>
            <ThemedView
              style={[
                styles.searchIconBox,
                { borderColor: Colors[theme].text },
              ]}
            >
              <Ionicons name="search" size={20} color={Colors[theme].text} />
            </ThemedView>
          </TouchableOpacity>
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
