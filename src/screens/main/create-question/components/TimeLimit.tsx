import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export const TimeLimit = () => {
  return (
    <TouchableOpacity style={styles.btn} activeOpacity={0.7}>
      <View style={styles.timeIcon}>
        <Icon name="time-outline" size={25} color={'white'} />
        <Text style={styles.textTime}>20 sec</Text>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  btn: {
    backgroundColor: '#7C4DFF',
    borderRadius: 8,
    paddingHorizontal: 8,
    width: 100,
    height: 30,
    justifyContent: 'center',
    position: 'relative',
    top: -20,
  },
  timeIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textTime: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 5,
  },
});
