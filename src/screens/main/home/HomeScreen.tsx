import React, {useState, useRef, useCallback} from 'react';
import {SafeAreaView, ScrollView, View, RefreshControl} from 'react-native';
import {
  BannerSlider,
  SectionContainer,
  KahootBottomSheet,
  EmptyMessage,
  KahootListItem,
  KahootListItemSkeleton,
} from '../../../components/ui/';
import {KahootSummary} from '../../../types/kahoot.type';
import {getPublicKahootsList} from '../../../services/kahoot/kahoot.service';
import styles from './HomeScreen.style';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {useFocusEffect} from '@react-navigation/native';

interface Props {
  navigation: any;
}

const HomeScreen = ({navigation}: Props) => {
  const [publicKahootsList, setPublicKahootsList] = useState<KahootSummary[]>();
  // const [isOver, setIsOver] = useState<boolean>(false);
  // const [ownKahootsList, setOwnKahootsList] = useState<KahootSummary[]>([]);
  const [isFetchingPublicKahootsList, setIsFetchingPublicKahootsList] =
    useState<boolean>(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [kahootDetailConfig, setKahootDetailConfig] = useState<{
    kahootID: number;
    isMyKahoot: boolean;
  }>();

  // Get public kahoot
  useFocusEffect(
    useCallback(() => {
      getPublicKahootsList()
        .then(response => {
          setPublicKahootsList(response.kahoots);
          setIsFetchingPublicKahootsList(false);
        })
        .catch(error => console.error(error));
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [refreshing]),
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    const timerId: NodeJS.Timeout = setTimeout(() => {
      setRefreshing(false);
      return clearTimeout(timerId);
    }, 2000);
  }, []);

  // const loadMore = () => {
  //   if (isOver) {
  //     return;
  //   }

  //   page.current++;
  //   getOwnKahootsList()
  //     .then(response => {
  //       setTimeout(() => {
  //         setOwnKahootsList(prev => [...prev, ...response.kahoots]);
  //       }, 1000);
  //       setIsOver(response.is_over);
  //     })
  //     .catch(error => console.error(error));
  // };

  // open bottom sheet
  const handlePresentModalPress = useCallback((kahootID: number) => {
    setKahootDetailConfig({kahootID, isMyKahoot: false});
    bottomSheetModalRef.current?.present();
  }, []);

  // const updateStateWhenDeleteKahoot = (kahootId: number) => {
  //   const newOwnKahootsList = ownKahootsList.filter(
  //     kahoot => kahoot.id !== kahootId,
  //   );
  //   const newKahootsList = publicKahootsList?.filter(
  //     kahoot => kahoot.id !== kahootId,
  //   );
  //   const newIsOver = newOwnKahootsList.length <= 5;
  //   setIsOver(newIsOver);
  //   setPublicKahootsList(newKahootsList);
  //   setOwnKahootsList(newOwnKahootsList);
  //   bottomSheetModalRef.current?.close();
  // };

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
            onPressSeeAll={null}>
            <View style={{padding: 8}}>
              {isFetchingPublicKahootsList && (
                <>
                  <KahootListItemSkeleton />
                  <KahootListItemSkeleton />
                  <KahootListItemSkeleton />
                </>
              )}

              {publicKahootsList && publicKahootsList.length === 0 && (
                <EmptyMessage messages={['Looks empty here...']} />
              )}

              {publicKahootsList &&
                publicKahootsList.length > 0 &&
                publicKahootsList.map(kahoot => (
                  <KahootListItem
                    key={kahoot.id}
                    kahoot={kahoot}
                    handleKahootListItemPress={handlePresentModalPress}
                  />
                ))}
            </View>
          </SectionContainer>
        </View>

        <KahootBottomSheet
          ref={bottomSheetModalRef}
          // updateStateWhenDeleteKahoot={updateStateWhenDeleteKahoot}
          kahootDetailConfig={kahootDetailConfig}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
