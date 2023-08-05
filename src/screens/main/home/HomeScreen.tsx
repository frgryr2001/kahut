import React, {useState, useEffect} from 'react';
import {SafeAreaView, ScrollView, View, RefreshControl} from 'react-native';
import {useSelector} from 'react-redux';

import {HomeSection, HomeBannerSlider, HomeKahootList} from './components';
import {selectStatus} from '../../../redux/slices/authSlice/selector';
import {SummaryKahoot} from '../../../types/kahoot.type';
import {
  getKahootsList,
  getOwnKahootsList,
} from '../../../services/kahoot/kahoot.service';
import styles from './HomeScreen.style';
import HomeSkeleton from './components/HomeSkeleton/HomeSkeleton';

interface Props {
  navigation: any;
}

const HomeScreen = ({navigation}: Props) => {
  const authStatus = useSelector(selectStatus);
  const [publicKahootsList, setPublicKahootsList] = useState<SummaryKahoot[]>();
  const [ownKahootsList, setOwnKahootsList] = useState<SummaryKahoot[]>();
  const [isFetchingPublicKahootsList, setIsFetchingPublicKahootsList] =
    useState<boolean>(true);
  const [isFetchingOwnKahootsList, setIsFetchingOwnKahootsList] =
    useState<boolean>(true);
  const [refreshing, setRefreshing] = React.useState(false);

  // Get public kahoot
  useEffect(() => {
    getKahootsList()
      .then(response => {
        setPublicKahootsList(response);
        setIsFetchingPublicKahootsList(false);
      })
      .catch(error => console.error(error));
  }, []);

  // If logged in, get own kahoot
  useEffect(() => {
    if (authStatus === 'authenticated') {
      getOwnKahootsList()
        .then(response => {
          setOwnKahootsList(response);
          setIsFetchingOwnKahootsList(false);
        })
        .catch(error => console.error(error));
    }
  }, [authStatus, refreshing]);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <SafeAreaView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={styles.container}>
          <HomeSection
            title="Discover"
            icon="compass-outline"
            onPressSeeAll={() => navigation.navigate('Discover')}>
            <HomeBannerSlider />
          </HomeSection>

          <HomeSection
            title="Public kahoots"
            icon="earth-outline"
            onPressSeeAll={() => navigation.navigate('Discover')}>
            {isFetchingPublicKahootsList && <HomeSkeleton />}
            {publicKahootsList && (
              <HomeKahootList kahootsList={publicKahootsList} />
            )}
          </HomeSection>

          {authStatus === 'authenticated' && (
            <HomeSection
              title="My kahoots"
              icon="person-outline"
              onPressSeeAll={() => navigation.navigate('Library')}>
              {isFetchingOwnKahootsList && <HomeSkeleton />}
              {ownKahootsList && (
                <HomeKahootList kahootsList={ownKahootsList} />
              )}
            </HomeSection>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
