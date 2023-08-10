import React, {useState, useEffect, useCallback} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import {useTheme} from '@react-navigation/native';

import {
  BannerSlider,
  SectionContainer,
  KahootSlider,
} from '../../../components/ui';
import {getUsersList} from '../../../services/user/user.service';
import {UserSummary} from '../../../types/user.type';
import styles from './DiscoverScreen.style';

interface Props {
  navigation: any;
}

const DiscoverScreen = ({navigation}: Props) => {
  const {colors} = useTheme();
  const [usersList, setUsersList] = useState<UserSummary[]>();
  const [isFetching, setIsFetching] = useState<boolean>(true);

  useEffect(() => {
    getUsersList().then(data => {
      setIsFetching(false);
      setUsersList(data);
    });
  }, []);

  const handleRefresh = useCallback(() => {
    setIsFetching(true);
    const timerId: NodeJS.Timeout = setTimeout(() => {
      setIsFetching(false);
      return clearTimeout(timerId);
    }, 2000);
  }, []);

  return (
    <SafeAreaView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={isFetching} onRefresh={handleRefresh} />
        }>
        <View style={styles.container}>
          <BannerSlider />

          {usersList &&
            usersList.map(user => (
              <SectionContainer
                key={user.id}
                title={user.name}
                onPressSeeAll={() =>
                  navigation.navigate('UserDetailScreen', {
                    id: user.id,
                    name: user.name,
                  })
                }>
                <KahootSlider kahootsList={user.kahoots} />
              </SectionContainer>
            ))}

          {isFetching && (
            <View style={styles.loading}>
              <ActivityIndicator color={colors.text} size={40} />
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DiscoverScreen;
