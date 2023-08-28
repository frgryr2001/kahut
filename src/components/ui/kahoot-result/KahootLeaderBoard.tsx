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
        {getIcon('ribbon-outline', 40, '#fff')}
        <Text style={styles.textTitle}>Top 5 high score</Text>
      </View>

      <View
        style={{
          marginTop: 10,
          gap: 10,
        }}>
        {top5LeaderBoard?.map((item, index) => (
          <>
            <KahootLeaderBoardItem key={index} item={item} index={index} />
          </>
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
    fontWeight: '700',
    textAlign: 'center',
  },
});
