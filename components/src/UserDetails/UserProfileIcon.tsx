import { View, Text, StyleSheet, useColorScheme } from 'react-native'
import React from 'react'
import { userInitials } from '@/utils/Interfaces/UserProfileIcon'
import { Colors } from '@/constants/Colors'
import { ThemedText } from '@/components/ThemedText'

const UserProfileIcon = ({firstLetter, secondLetter}: {firstLetter: string, secondLetter: string}) => {
    const theme = useColorScheme() || 'light';
  return (
    <View style={[styles.container, {borderColor: Colors[theme].text}]}>
      <ThemedText>{firstLetter+secondLetter}</ThemedText>
    </View>
  )
}

export default UserProfileIcon

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: 30,
    height: 30, 
    borderWidth: 1,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center'
  }
})