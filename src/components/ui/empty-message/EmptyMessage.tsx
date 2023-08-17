import {View, Text} from 'react-native';
import React from 'react';

interface Props {
  messages: string[];
}

const EmptyMessage = ({messages}: Props) => {
  return (
    <View
      style={{
        justifyContent: 'center',
        padding: 16,
        gap: 16,
      }}>
      {messages.map(message => (
        <Text key={message} style={{color: '#777', textAlign: 'center'}}>
          {message}
        </Text>
      ))}
    </View>
  );
};

export default EmptyMessage;
