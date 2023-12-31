import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {getIcon} from '../../../helpers/getIcon';
import KahootLeaderBoardItem from './KahootLeaderBoardItem';

export default function KahootLeaderBoard({
  top5LeaderBoard,
}: {
  top5LeaderBoard: Array<{
    id: number;
    userId: number;
    point: number;
    username: string;
    userImage: string;
  }>;
}) {
  return (
    <View>
      <View style={styles.containerTitle}>
        {getIcon('seal-variant', 40, '#fff')}
        <Text style={styles.textTitle}>Top 5 high scores</Text>
      </View>

      <View
        style={{
          marginTop: 16,
          gap: 10,
        }}>
        {top5LeaderBoard?.map((item, index) => (
          <KahootLeaderBoardItem key={item.id} item={item} index={index} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },
  textTitle: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'Poppins-Bold',
  },
});
