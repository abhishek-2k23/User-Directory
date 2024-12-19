import React, { useEffect } from 'react';
import { View, Image, StyleSheet, SafeAreaView, ScrollView, useColorScheme } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { useLocalSearchParams } from 'expo-router';
import { setUserDetailsScreenData } from '@/redux/slice/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '@/components/Loader';


const UserDetails: React.FC = () => {
  const theme = useColorScheme(); // Get the current theme (light or dark)
  const themeColors = Colors[theme || 'light']; // Default to light theme if null
  const {id} = useLocalSearchParams();
  const dispatch = useDispatch();
  const userDetailsScreenData = useSelector((store: any) => store.users.userDetailsScreenData);
  console.log(userDetailsScreenData);

  useEffect(() => {
    if (id) {
      dispatch(setUserDetailsScreenData(id.toString())); // Ensure `id` is a string
    }
  }, [id, dispatch]);

  if (userDetailsScreenData === null) {
    return <Loader />
  }

  return (
    <LinearGradient
      // Gradient background for a glassmorphic effect
      colors={theme === 'dark' ? ['rgba(0,0,0,0.8)', 'rgba(0,0,0,0.3)'] : ['rgba(255,255,255,0.8)', 'rgba(255,255,255,0.3)']}
      style={styles.container}
    >

      <SafeAreaView style={styles.safeArea}>
        {/* Scrollable container for better user experience on smaller screens */}
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <ThemedView style={[styles.card, { backgroundColor: themeColors.cardBackground }]}>
            {/* Profile picture displayed in a circular format */}
            <Image
              source={{ uri: 'https://random-image-pepebigotes.vercel.app/api/random-image' }}
              style={styles.profilePicture}
            />
            {/* User's name */}
            <ThemedText style={styles.name}>{userDetailsScreenData?.name}</ThemedText>
            {/* User's email address */}
            <ThemedText style={styles.email}>{userDetailsScreenData?.email}</ThemedText>
            {/* User's physical address */}
            <ThemedText style={styles.address}>{userDetailsScreenData?.address?.city}</ThemedText>
            {/* User's phone number */}
            <ThemedText style={styles.phone}>{userDetailsScreenData?.phone}</ThemedText>
            {/* User's company details */}
            <ThemedText style={styles.company}>{userDetailsScreenData?.company?.name}</ThemedText>
          </ThemedView>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center', // Ensures the content is centered horizontally
  },
  safeArea: {
    flex: 1,
    width: '100%', // Ensures the content takes up the full width
  },
  scrollContainer: {
    flexGrow: 1, // Allows the content to grow and remain scrollable
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    borderRadius: 20, // Rounded corners for a modern design
    padding: 20,
    alignItems: 'center', // Centers content within the card
    shadowColor: '#000', // Adds shadow for a lifted look
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1, // Light shadow effect
    shadowRadius: 10,
    elevation: 5, // Shadow for Android devices
    width: '80%', // Restricts the width of the card
  },
  profilePicture: {
    width: 100, // Width of the profile picture
    height: 100, // Height of the profile picture
    borderRadius: 50, // Makes the image circular
    marginBottom: 15, // Adds spacing below the image
  },
  name: {
    fontSize: 24, // Larger font size for emphasis
    fontWeight: 'bold',
    marginBottom: 5, // Spacing below the name
  },
  email: {
    fontSize: 16,
    marginBottom: 5, // Spacing below the email
  },
  address: {
    fontSize: 16,
    marginBottom: 5, // Spacing below the address
  },
  phone: {
    fontSize: 16,
    marginBottom: 5, // Spacing below the phone number
  },
  company: {
    fontSize: 16, // Standard text size
  },
});

export default UserDetails;
