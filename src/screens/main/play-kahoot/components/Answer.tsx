import {Text, StyleSheet, Pressable, Image} from 'react-native';
import React from 'react';
import {Answer as IAnswer} from '../../../../types/kahoot.type';
import {Dimensions} from 'react-native';

const height = Dimensions.get('window').height;

export default function Answer({
  color,
  item,
  handleChoice,
  isChoice,
  imageAnswer,
}: {
  color: string;
  item: IAnswer | boolean;
  handleChoice: (item: number | boolean) => void;
  isChoice: boolean;
  imageAnswer?: string | null;
}) {
  if (typeof item === 'boolean') {
    return (
      <Pressable
        style={[
          styles.answer,
          {
            backgroundColor: color,
            height: height / 3,
          },
          isChoice && {
            borderColor: isChoice ? '#00c853' : '',
            borderWidth: isChoice ? 2 : 0,
          },
        ]}
        onPress={() => {
          handleChoice(item);
        }}>
        <Text
          style={[
            styles.text,
            {
              fontFamily: 'Poppins-Bold',
            },
          ]}>
          {item ? 'True' : 'False'}
        </Text>
      </Pressable>
    );
  }
  return (
    <Pressable
      style={[
        styles.answer,
        {
          backgroundColor: color,
        },
        isChoice && {
          borderColor: isChoice ? '#00c853' : '',
          borderWidth: isChoice ? 4 : 0,
        },
      ]}
      onPress={() => {
        handleChoice(item.id);
      }}>
      {imageAnswer ? (
        <Image
          source={{uri: imageAnswer}}
          style={{width: 100, height: 100}}
          resizeMode="contain"
        />
      ) : (
        <Text
          style={[
            styles.text,
            {
              fontFamily: 'Poppins-Bold',
            },
          ]}>
          {item?.text}
        </Text>
      )}
    </Pressable>
  );
}
const styles = StyleSheet.create({
  answer: {
    backgroundColor: '#fff',
    padding: 20,
    height: 150,
    borderRadius: 3,
    marginBottom: 20,
    width: '48%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    color: '#fff',
  },
});
