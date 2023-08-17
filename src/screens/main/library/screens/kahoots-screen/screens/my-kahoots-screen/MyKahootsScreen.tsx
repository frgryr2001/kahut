import React, {useCallback, useEffect, useState} from 'react';
import {View, ScrollView, SafeAreaView, RefreshControl} from 'react-native';
import {useSelector} from 'react-redux';
// import {useNavigation} from '@react-navigation/native';
// import {StackNavigationProp} from '@react-navigation/stack';

import {
  EmptyMessage,
  KahootListItem,
  KahootListItemSkeleton,
} from '../../../../../../../components/ui';
import {KahootSummary} from '../../../../../../../types/kahoot.type';
import {selectStatus} from '../../../../../../../redux/slices/authSlice/selector';
import {getOwnKahootsList} from '../../../../../../../services/kahoot/kahoot.service';
// import {RootStackParams} from '../../../../../../../navigation/AppNavigationContainer';

const MyKahootsScreen = () => {
  // const navigation = useNavigation<StackNavigationProp<RootStackParams>>();

  const authStatus = useSelector(selectStatus);
  const [ownKahootsList, setOwnKahootsList] = useState<KahootSummary[]>();
  const [isFetchingOwnKahootsList, setIsFetchingOwnKahootsList] =
    useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  useEffect(() => {
    if (authStatus === 'authenticated') {
      getOwnKahootsList(1)
        .then(response => {
          setOwnKahootsList(response.kahoots);
          setIsFetchingOwnKahootsList(false);
        })
        .catch(error => console.error(error));
    }
  }, [authStatus, refreshing]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <SafeAreaView
      style={{
        padding: 8,
      }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View
          style={{
            gap: 16,
          }}>
          {isFetchingOwnKahootsList && (
            <>
              <KahootListItemSkeleton />
              <KahootListItemSkeleton />
              <KahootListItemSkeleton />
            </>
          )}
          {ownKahootsList && ownKahootsList.length === 0 && (
            <EmptyMessage messages={['Looks empty here...']} />
          )}

          {ownKahootsList &&
            ownKahootsList.length > 0 &&
            ownKahootsList.map(kahoot => (
              <KahootListItem key={kahoot.id} kahoot={kahoot} />
            ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MyKahootsScreen;
