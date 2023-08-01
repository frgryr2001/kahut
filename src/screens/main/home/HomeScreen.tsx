import React from 'react';
import {View, Text} from 'react-native';
import {useTheme} from '@react-navigation/native';

const HomeScreen = () => {
  const {colors} = useTheme();

  return (
    <View>
      <Text style={{color: colors.text}}>HomeScreen</Text>
    </View>
  );
};

export default HomeScreen;
