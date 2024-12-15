import React, { useEffect, useRef } from 'react';
import { Animated, View, StyleSheet, useColorScheme } from 'react-native';
import { Colors } from '@/constants/Colors';

const Loader = () => {
    const theme = useColorScheme() || "light";
  const scaleAnim1 = useRef(new Animated.Value(0)).current;
  const scaleAnim2 = useRef(new Animated.Value(0)).current;
  const scaleAnim3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const createAnimation = (animatedValue:any, delay:any) => {
      return Animated.loop(
        Animated.sequence([
          Animated.timing(animatedValue, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: true,
          }),
          Animated.timing(animatedValue, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
          }),
        ]),
        { delay }
      );
    };

    const anim1 = createAnimation(scaleAnim1, 0);
    const anim2 = createAnimation(scaleAnim2, 500);
    const anim3 = createAnimation(scaleAnim3, 1000);

    anim1.start();
    anim2.start();
    anim3.start();

    return () => {
      anim1.stop();
      anim2.stop();
      anim3.stop();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.circle,
          {
            transform: [{ scale: scaleAnim1 }],
            backgroundColor: theme === 'dark' ? '#def' : '#333'
          },
        ]}
      />
      <Animated.View
        style={[
          styles.circle,
          {
            transform: [{ scale: scaleAnim2 }],
            backgroundColor: theme === 'dark' ? '#def' : '#333'
          },
        ]}
      />
      <Animated.View
        style={[
          styles.circle,
          {
            transform: [{ scale: scaleAnim3 }],
            backgroundColor: theme === 'dark' ? '#def' : '#333'
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '95%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderRadius: 10,
    opacity: 0.3,
  },
});

export default Loader;
