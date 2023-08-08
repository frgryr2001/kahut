import React, {useState, useEffect} from 'react';
import {SafeAreaView, ScrollView, View, RefreshControl} from 'react-native';
import {useSelector} from 'react-redux';

import {
  BannerSlider,
  SectionContainer,
  KahootSlider,
} from '../../../components/ui/';
import {HomeSkeleton} from './components';
import {selectStatus} from '../../../redux/slices/authSlice/selector';
import {KahootSummary} from '../../../types/kahoot.type';
import {
  getKahootsList,
  getOwnKahootsList,
} from '../../../services/kahoot/kahoot.service';
import styles from './HomeScreen.style';

interface Props {
  navigation: any;
}

const HomeScreen = ({navigation}: Props) => {
  const authStatus = useSelector(selectStatus);
  const [publicKahootsList, setPublicKahootsList] = useState<KahootSummary[]>();
  const [ownKahootsList, setOwnKahootsList] = useState<KahootSummary[]>([]);
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
  }, [refreshing]);

  //   If logged in, get own kahoot
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
    const timerId: NodeJS.Timeout = setTimeout(() => {
      setRefreshing(false);
      return clearTimeout(timerId);
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
          <SectionContainer
            title="Discover"
            icon="compass-outline"
            onPressSeeAll={() => navigation.navigate('Discover')}>
            <BannerSlider />
          </SectionContainer>

          <SectionContainer
            title="Public kahoots"
            icon="earth-outline"
            onPressSeeAll={() => navigation.navigate('Discover')}>
            {isFetchingPublicKahootsList && <HomeSkeleton />}
            {publicKahootsList && (
              <KahootSlider kahootsList={publicKahootsList} />
            )}
          </SectionContainer>

          {authStatus === 'authenticated' && (
            <SectionContainer
              title="My kahoots"
              icon="person-outline"
              onPressSeeAll={() => navigation.navigate('Library')}>
              {isFetchingOwnKahootsList && <HomeSkeleton />}
              {ownKahootsList && <KahootSlider kahootsList={ownKahootsList} />}
            </SectionContainer>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
