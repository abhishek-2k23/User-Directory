import { View, Text, FlatList, ScrollView } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import UserComponent from './UserComponent';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
const UsersComponentList = () => {
    const usersShortInfo = useSelector((store:any) => store.users.usersShortInfo);
  return (
      <FlatList
        data={usersShortInfo}
        renderItem={({item}) => <Link href={"/UserDetails"} ><UserComponent name={item.name} email={item.email} /></Link>}
        keyExtractor={item => item.id}
        contentContainerStyle={{gap: 10,}}
      />
  )
}

export default UsersComponentList