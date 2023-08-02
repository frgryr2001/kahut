import React from 'react';
import {Dimensions, View} from 'react-native';
import {useTheme} from '@react-navigation/native';

import {Skeleton} from '../../../../../components/ui';
import styles from './HomeSkeleton.style';

const WIDTH = Math.round((Dimensions.get('window').width - 40) / 2);

const HomeSkeletonItem = () => {
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
      <Skeleton width={WIDTH} height={120} />

      <View style={styles.bottomContainer}>
        <Skeleton
          width={WIDTH - 16}
          height={8}
          style={{
            borderRadius: 8,
          }}
        />

        <Skeleton
          width={WIDTH - 16}
          height={8}
          style={{
            borderRadius: 8,
          }}
        />

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

const HomeSkeleton = () => {
  return (
    <View
      style={{
        padding: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
      <HomeSkeletonItem />
      <HomeSkeletonItem />
    </View>
  );
};

export default HomeSkeleton;
