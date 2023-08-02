import React, {useRef, useEffect} from 'react';
import {View, DimensionValue, ViewStyle} from 'react-native';
import {LinearGradient} from 'react-native-linear-gradient';
import {Animated} from 'react-native';

interface Props {
  width: DimensionValue;
  height: number;
  style?: ViewStyle;
}

const Skeleton = ({width, height, style}: Props) => {
  const transition = useRef(new Animated.Value(-width!));

  useEffect(() => {
    Animated.loop(
      Animated.timing(transition.current, {
        toValue: +width!,
        useNativeDriver: true,
        duration: 1500,
      }),
    ).start();
  }, [width]);

  return (
    <View
      style={{
        width: width,
        height: height,
        backgroundColor: 'rgba(0,0,0,0.12)',
        overflow: 'hidden',
        ...style,
      }}>
      <Animated.View
        style={{
          width: '100%',
          height: '100%',
          transform: [
            {
              translateX: transition.current,
            },
          ],
        }}>
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.05)', 'transparent']}
          style={{
            width: '100%',
            height: '100%',
          }}
          start={{
            x: 1,
            y: 1,
          }}
        />
      </Animated.View>
    </View>
  );
};

export default Skeleton;
