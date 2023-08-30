import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {useTheme} from '@react-navigation/native';

export default function KahootLeaderBoardItem({
  item,
  index,
}: {
  item: any;
  index: number;
}) {
  const {colors} = useTheme();
  return (
    <View style={styles.container}>
      <Text style={[styles.text, {color: colors.text}]}>{index + 1}.</Text>

      <Text
        style={[
          styles.text,
          {
            color: colors.text,
          },
        ]}>
        {item.username}
      </Text>
      <Text
        style={[
          styles.text,
          {
            color: colors.text,
          },
        ]}>
        {item.point}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 3,
    padding: 16,
  },
  text: {
    fontSize: 16,
    textTransform: 'capitalize',
  },
});
