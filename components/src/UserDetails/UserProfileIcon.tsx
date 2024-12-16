import { View, Text, StyleSheet, useColorScheme, Image } from 'react-native'
import React, { Profiler } from 'react'
import { Colors } from '@/constants/Colors'
import { ThemedText } from '@/components/ThemedText'

const UserProfileIcon = () => {
    const theme = useColorScheme() || 'light';
  return (
    <View style={[styles.container, {borderColor: Colors[theme].text}]}>
      <Image style={styles.profilePic} source={{uri:'https://random-image-pepebigotes.vercel.app/api/random-image'}} />
    </View>
  )
}

export default UserProfileIcon

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: 40,
    height: 40, 
    borderWidth: 1,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 100,
  }
})