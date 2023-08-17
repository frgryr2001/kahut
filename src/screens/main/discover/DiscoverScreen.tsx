import React, {useState, useEffect, useCallback, useRef} from 'react';
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
  KahootBottomSheet,
} from '../../../components/ui';
import {getUsersList} from '../../../services/user/user.service';
import {UserSummary} from '../../../types/user.type';
import styles from './DiscoverScreen.style';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {useSelector} from 'react-redux';
import {selectUser} from '../../../redux/slices/authSlice/selector';

interface Props {
  navigation: any;
}

const DiscoverScreen = ({navigation}: Props) => {
  const {colors} = useTheme();
  const [usersList, setUsersList] = useState<UserSummary[]>();
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const userStore = useSelector(selectUser);
  const [kahootDetailConfig, setKahootDetailConfig] = useState<{
    kahootID: number;
    isMyKahoot: boolean;
  }>();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

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

  // open bottom sheet
  const handlePresentModalPress = useCallback(
    (kahootID: number, isMyKahoot: boolean) => {
      setKahootDetailConfig({kahootID, isMyKahoot});
      bottomSheetModalRef.current?.present();
    },
    [],
  );

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
                <KahootSlider
                  kahootsList={user.kahoots}
                  onItemPress={handlePresentModalPress}
                  isMyKahoot={userStore?.id === user.id}
                />
                <KahootBottomSheet
                  ref={bottomSheetModalRef}
                  kahootDetailConfig={kahootDetailConfig}
                />
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
