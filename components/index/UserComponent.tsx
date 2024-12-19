import {
  StyleSheet,
  useColorScheme,
  TouchableOpacity,
  View,
} from "react-native"
import React, { useEffect } from "react"
import { ThemedText } from "@/components/ThemedText"
import { ThemedView } from "@/components/ThemedView"
import { Colors } from "@/constants/Colors"
import UserProfileIcon from "../UserDetails/UserProfileIcon"

const UserComponent = ({
  name,
  email,
  itemNo,
  onPress,
  
}: {
  name: string
  email: string
  itemNo: number
  onPress: () => void
}) => {
  const theme = useColorScheme() || "light"

  
  return (
    <TouchableOpacity onPress={onPress}>
      <ThemedView
        style={[styles.container, { borderColor: Colors[theme].text, borderStartWidth: 2,  borderBottomWidth: 3, borderBottomColor: "rgba(52, 50, 50, 0.96)" }]}
      >
        {/* left section  */}
        <View>
          {/* name */}
          <ThemedText> {itemNo+". "+name}</ThemedText>
          {/* email  */}
          <ThemedText style={{ paddingLeft: 15 }}> {email}</ThemedText>
        </View>

        {/* right section  */}
        <View>
          <UserProfileIcon />
        </View>
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
