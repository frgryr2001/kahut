import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Question = () => {
  return (
    <TouchableOpacity activeOpacity={0.9}>
      <View style={styles.questionContainer}>
        <View style={styles.imageQuestion}>
          <Icon name="image-outline" size={30} color="#BDBDBD" />
        </View>
        <Text style={styles.typeQuestion}>1 - Quiz</Text>
        {/* icon warning ! */}
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  questionContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: 'white',
    height: 80,
    borderRadius: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 1,
  },
  imageQuestion: {
    flex: 0.4,
    backgroundColor: '#969da3',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  typeQuestion: {
    fontFamily: 'Poppins-Medium',
    color: 'black',
    paddingLeft: 10,
    paddingTop: 5,
  },
});
export default Question;
