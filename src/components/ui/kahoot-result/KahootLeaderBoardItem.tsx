import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import {useTheme} from '@react-navigation/native';

export default function KahootLeaderBoardItem({
  item,
}: {
  item: any;
  index: number;
}) {
  const {colors} = useTheme();
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 8,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 8,
            flex: 1,
          }}>
          <Image
            source={{uri: item.userImage}}
            width={40}
            height={40}
            borderRadius={999}
          />

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
        </View>

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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 3,
    padding: 16,
  },
  text: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
  },
});
