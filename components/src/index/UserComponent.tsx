import {
  View,
  Text,
  StyleSheet,
  useColorScheme,
  TouchableOpacity,
} from "react-native"
import React, { useEffect } from "react"
import { ThemedText } from "@/components/ThemedText"
import { ThemedView } from "@/components/ThemedView"
import { Colors } from "@/constants/Colors"
import UserProfileIcon from "../UserDetails/UserProfileIcon"
import { useDispatch, useSelector } from "react-redux"
import store from "@/redux/store"

const UserComponent = ({
  name,
  email,
  onPress,
}: {
  name: string
  email: string
  onPress: () => void
}) => {
  const theme = useColorScheme() || "light"

  
  return (
    <TouchableOpacity onPress={onPress}>
      <ThemedView
        style={[styles.container, { borderColor: Colors[theme].text }]}
      >
        {/* left section  */}
        <ThemedView>
          {/* name */}
          <ThemedText> {name}</ThemedText>
          {/* email  */}
          <ThemedText style={{ paddingLeft: 10 }}> {email}</ThemedText>
        </ThemedView>

        {/* right section  */}
        <ThemedView>
          <UserProfileIcon />
        </ThemedView>
      </ThemedView>
    </TouchableOpacity>
  )
}

export default UserComponent

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    borderRadius: 10,
    padding: 5,
  },
})
