import { View, Text, StyleSheet, useColorScheme } from "react-native"
import React, { useEffect } from "react"
import { ThemedText } from "@/components/ThemedText"
import { ThemedView } from "@/components/ThemedView"
import { Colors } from "@/constants/Colors"
import UserProfileIcon from "../UserDetails/UserProfileIcon"
import { useDispatch, useSelector } from "react-redux"
import { getShortInfo } from "@/redux/slice/userSlice"
import store from "@/redux/store"

const UserComponent = ({name, email}: {name: string, email: string}) => {
  const theme = useColorScheme() || 'light';
    

  return (
    <ThemedView style={[styles.container, {borderColor: Colors[theme].text}]}>
      {/* left section  */}
      <ThemedView>
        {/* name */}
        <ThemedText> {name}</ThemedText>
        {/* email  */}
        <ThemedText style={{paddingLeft: 10,}}> {email}</ThemedText>
      </ThemedView>

      {/* right section  */}
      <ThemedView> 
        <UserProfileIcon />
      </ThemedView>
    </ThemedView>
  )
}

export default UserComponent

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    flex: 1,
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginVertical: 5,
  },
})
