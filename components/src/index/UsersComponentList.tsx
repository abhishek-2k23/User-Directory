import { View, Text, FlatList, ScrollView } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import UserComponent from './UserComponent';
import { SafeAreaView } from 'react-native-safe-area-context';
const UsersComponentList = () => {
    const usersShortInfo = useSelector((store:any) => store.users.usersShortInfo);
  return (
    <SafeAreaView>
        <ScrollView>
      <FlatList
        data={usersShortInfo}
        renderItem={({item}) => <UserComponent name={item.name} email={item.email} />}
        keyExtractor={item => item.id}
      />
    </ScrollView>
    </SafeAreaView>
  )
}

export default UsersComponentList