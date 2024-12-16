import {StyleSheet, TextInput, useColorScheme, TouchableOpacity } from "react-native"
import React, { useEffect, useState } from "react"
import { ThemedView } from "@/components/ThemedView"
import { ThemedText } from "@/components/ThemedText"
import { SafeAreaView } from "react-native-safe-area-context"
import { Link } from "expo-router"
import { Colors } from "@/constants/Colors"
import { Ionicons } from "@expo/vector-icons"
import UserComponent from "@/components/src/index/UserComponent"
import { fetchUser } from "@/api/fetchUser"
import useFetchUser from "@/hooks/useFetchUser"
import UsersComponentList from "@/components/src/index/UsersComponentList"
import { useSelector } from "react-redux"
import Loader from "@/components/src/Loader"

const Home = () => {
  const theme = useColorScheme() || "light";
  const loader = useSelector((store: any) => store.users.loader);
  const fetchAndStoreUsers = useFetchUser();

  useEffect(() => {
    fetchAndStoreUsers();
  }, []);
  
    return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: Colors[theme].background }]}
    >
      <ThemedView>
        {/* app name  */}
        <ThemedText style={styles.appTitle}> User Directory</ThemedText>
        {/* search box  & filter option icon */}
        <ThemedView
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: 10,
          }}
        >
          <TextInput
            style={[
              styles.textInput,
              { borderColor: Colors[theme].text, color: Colors[theme].text },
            ]}
          ></TextInput>
          <TouchableOpacity>
            <ThemedView style={[styles.searchIconBox, {borderColor: Colors[theme].text, }]}>
              
              <Ionicons name="search" size={20} color={Colors[theme].text} />
            </ThemedView>
          </TouchableOpacity>
        </ThemedView>

        {/* user components  */}
        {
          loader ? <Loader /> : <ThemedView>
            <UsersComponentList />
        </ThemedView>
        }
        


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
    borderRadius:5,
    padding: 5,
  }
})
