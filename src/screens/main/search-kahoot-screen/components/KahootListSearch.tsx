import {View, Text} from 'react-native';
import React from 'react';
import {Kahoot} from '../../../../types/search.type';
import {KahootListItem} from '../../../../components/ui';
import {useTheme} from '@react-navigation/native';

export default function KahootListSearch({
  kahoots,
  handlePresentModalPress,
}: {
  kahoots: Kahoot[];
  handlePresentModalPress: (kahootID: number) => void;
}) {
  const {colors} = useTheme();
  return (
    <View
      style={{
        flex: 1,
        marginTop: 10,
      }}>
      {kahoots?.length > 0 && (
        <Text
          style={{
            color: colors.text,
            fontSize: 16,
            fontFamily: 'Poppins-Bold',
          }}>
          Kahoots
        </Text>
      )}
      {kahoots?.map(kahoot => (
        <KahootListItem
          key={kahoot.id}
          kahoot={kahoot}
          handleKahootListItemPress={() => handlePresentModalPress(kahoot.id)}
        />
      ))}
    </View>
  );
}
