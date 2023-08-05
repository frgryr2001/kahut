import React from 'react';
import {Dimensions, View} from 'react-native';
import {useTheme} from '@react-navigation/native';

import {Skeleton} from '../../../components/ui';
import styles from './KahootListItemSkeleton.style';

const WIDTH = Math.round(Dimensions.get('window').width - 32);

const KahootListItemSkeleton = () => {
  const {colors} = useTheme();

  return (
    <View
      style={[
        {
          width: WIDTH,
          backgroundColor: colors.card,
        },
        styles.container,
      ]}>
      <Skeleton width={150} height={100} />

      <View style={styles.rightContainer}>
        <View style={{gap: 8}}>
          <Skeleton
            width={WIDTH - 150 - 16}
            height={8}
            style={{
              borderRadius: 8,
            }}
          />

          <Skeleton
            width={WIDTH - 150 - 16}
            height={8}
            style={{
              borderRadius: 8,
            }}
          />
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 8,
          }}>
          <Skeleton
            width={20}
            height={20}
            style={{
              borderRadius: 999,
            }}
          />

          <Skeleton
            width={WIDTH - 32}
            height={8}
            style={{
              borderRadius: 8,
              flex: 1,
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default KahootListItemSkeleton;
