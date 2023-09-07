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
  return kahoots.length > 0 ? (
    <View>
      <Text
        style={{
          color: colors.text,
          fontSize: 16,
          fontFamily: 'Poppins-Bold',
          paddingHorizontal: 8,
        }}>
        Kahoots
      </Text>

      <View>
        {kahoots?.map(kahoot => (
          <KahootListItem
            key={kahoot.id}
            kahoot={kahoot}
            handleKahootListItemPress={() => handlePresentModalPress(kahoot.id)}
          />
        ))}
      </View>
    </View>
  ) : null;
}
