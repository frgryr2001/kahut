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
      <Text
        style={[
          styles.text,
          {color: colors.text, fontWeight: '600', fontSize: 20},
        ]}>
        {index + 1}.
      </Text>

      <Text
        style={[
          styles.text,
          {
            color: colors.text,
            flex: 1,
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
    gap: 8,
  },
  text: {
    fontSize: 16,
  },
});
