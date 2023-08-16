import React, {useState, useRef, useCallback} from 'react';
import {SafeAreaView, ScrollView, View, RefreshControl} from 'react-native';
import {useSelector} from 'react-redux';
import {
  BannerSlider,
  SectionContainer,
  KahootSlider,
  KahootBottomSheet,
} from '../../../components/ui/';
import {HomeSkeleton} from './components';
import {selectStatus} from '../../../redux/slices/authSlice/selector';
import {KahootSummary} from '../../../types/kahoot.type';
import {
  getKahootsList,
  getOwnKahootsList,
  getKahootDetail,
  deleteKahootById,
} from '../../../services/kahoot/kahoot.service';
import styles from './HomeScreen.style';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {useFocusEffect} from '@react-navigation/native';

interface Props {
  navigation: any;
}

const HomeScreen = ({navigation}: Props) => {
  const authStatus = useSelector(selectStatus);
  const [publicKahootsList, setPublicKahootsList] = useState<KahootSummary[]>();
  const [isOver, setIsOver] = useState<boolean>(false);
  const [ownKahootsList, setOwnKahootsList] = useState<KahootSummary[]>([]);
  const [isFetchingPublicKahootsList, setIsFetchingPublicKahootsList] =
    useState<boolean>(true);
  const [isFetchingOwnKahootsList, setIsFetchingOwnKahootsList] =
    useState<boolean>(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const page = useRef<number>(1);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // Get public kahoot
  useFocusEffect(
    useCallback(() => {
      getKahootsList()
        .then(response => {
          setPublicKahootsList(response.kahoots);
          setIsFetchingPublicKahootsList(false);
        })
        .catch(error => console.error(error));
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [refreshing]),
  );

  useFocusEffect(
    useCallback(() => {
      if (authStatus === 'authenticated') {
        getOwnKahootsList(page.current)
          .then(response => {
            setOwnKahootsList(response.kahoots);
            setIsOver(response.is_over);
            setIsFetchingOwnKahootsList(false);
          })
          .catch(error => console.error(error));
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [authStatus, refreshing]),
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    const timerId: NodeJS.Timeout = setTimeout(() => {
      setRefreshing(false);
      return clearTimeout(timerId);
    }, 2000);
  }, []);

  const loadMore = () => {
    if (isOver) {
      return;
    }

    page.current++;
    getOwnKahootsList(page.current)
      .then(response => {
        setTimeout(() => {
          setOwnKahootsList(prev => [...prev, ...response.kahoots]);
        }, 1000);
        setIsOver(response.is_over);
      })
      .catch(error => console.error(error));
  };

  // open bottom sheet
  const handlePresentModalPress = useCallback(
    (kahootID: number, isMyKahoot: boolean) => {
      const getKahootDetailById = async () => {
        const response = await getKahootDetail(kahootID);
        response.isMyKahoot = isMyKahoot;
        bottomSheetModalRef.current?.present(response);
      };
      getKahootDetailById();
    },
    [],
  );
  //   detele kahoot
  const deleteKahoot = async (kahootId: number) => {
    const response = await deleteKahootById(kahootId);
    if (response.code === 200) {
      const newOwnKahootsList = ownKahootsList.filter(
        kahoot => kahoot.id !== kahootId,
      );
      const newKahootsList = publicKahootsList?.filter(
        kahoot => kahoot.id !== kahootId,
      );
      const newIsOver = newOwnKahootsList.length <= 5;
      setIsOver(newIsOver);
      setPublicKahootsList(newKahootsList);
      setOwnKahootsList(newOwnKahootsList);
      bottomSheetModalRef.current?.close();
    }
  };

  return (
    <KahootBottomSheet ref={bottomSheetModalRef} deleteKahoot={deleteKahoot}>
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
                <KahootSlider
                  kahootsList={publicKahootsList}
                  onItemPress={handlePresentModalPress}
                />
              )}
            </SectionContainer>

            {authStatus === 'authenticated' && (
              <SectionContainer
                title="My kahoots"
                icon="person-outline"
                onPressSeeAll={() => navigation.navigate('Library')}>
                {isFetchingOwnKahootsList && <HomeSkeleton />}
                {ownKahootsList && (
                  <KahootSlider
                    kahootsList={ownKahootsList}
                    loadMore={loadMore}
                    onItemPress={handlePresentModalPress}
                    isMyKahoot
                  />
                )}
              </SectionContainer>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </KahootBottomSheet>
  );
};

export default HomeScreen;
