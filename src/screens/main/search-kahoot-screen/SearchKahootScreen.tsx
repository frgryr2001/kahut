import React, {useCallback, useRef} from 'react';
import {SearchInput} from './components/SearchInput';
import {
  SafeAreaView,
  ActivityIndicator,
  View,
  Text,
  Keyboard,
  Pressable,
} from 'react-native';
import Container from './components/Container';
import BoxResultSearch from './components/BoxResultSearch';
import UserListSearch from './components/UserListSearch';
import KahootListSearch from './components/KahootListSearch';
import {search} from '../../../services/search/search.service';
import {SearchData} from '../../../types/search.type';
import {useTheme} from '@react-navigation/native';
import {RootStackParams} from '../../../navigation/AppNavigationContainer';
import {StackScreenProps} from '@react-navigation/stack';
import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {KahootBottomSheet} from '../../../components/ui';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
interface Props
  extends StackScreenProps<RootStackParams, 'SearchKahootScreen'> {}
export default function SearchKahootScreen({navigation}: Props) {
  const {colors} = useTheme();
  const [searchText, setSearchText] = React.useState('');
  const [searchResult, setSearchResult] = React.useState<SearchData>();
  const [isSearching, setIsSearching] = React.useState(false);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [kahootDetailConfig, setKahootDetailConfig] = React.useState<{
    kahootID: number;
    isMyKahoot: boolean;
  }>();

  // open bottom sheet
  const handlePresentModalPress = React.useCallback((kahootID: number) => {
    setKahootDetailConfig({kahootID, isMyKahoot: false});
    bottomSheetModalRef.current?.present();
  }, []);

  const onSearch = useCallback((value: string) => {
    setSearchText(value);
  }, []);

  const handleSearchSubmit = useCallback(async () => {
    try {
      setIsSearching(true);
      Keyboard.dismiss();
      const res = await search(searchText);
      if (res.code === 200) {
        setIsSearching(false);
        setSearchResult(res.data);
      }
    } catch (error) {
      setIsSearching(false);

      console.log(error);
    }
  }, [searchText]);

  let content = null;

  if (
    searchResult?.users?.length === 0 &&
    searchResult?.kahoots?.length === 0
  ) {
    content = (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{color: colors.text}}>No result found</Text>
      </View>
    );
  } else {
    content = (
      <>
        <UserListSearch users={searchResult?.users!} />
        {/* kahoot result search */}
        <KahootListSearch
          kahoots={searchResult?.kahoots!}
          handlePresentModalPress={handlePresentModalPress}
        />
      </>
    );
  }

  return (
    <GestureHandlerRootView
      style={{
        flex: 1,
      }}>
      <BottomSheetModalProvider>
        <SafeAreaView
          style={{
            flex: 1,
          }}>
          <Container>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',

                gap: 10,
              }}>
              <SearchInput
                onDebounce={onSearch}
                handleSearchSubmit={handleSearchSubmit}
              />
              <Pressable onPress={() => navigation.goBack()}>
                <Text
                  style={{
                    color: colors.text,
                    fontWeight: 'bold',
                    fontSize: 16,
                  }}>
                  Cancel
                </Text>
              </Pressable>
            </View>
            <BoxResultSearch>
              {/* user result search */}
              {isSearching ? (
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <ActivityIndicator
                    size="large"
                    color={colors.primary}
                    animating={isSearching}
                  />
                </View>
              ) : (
                <>{content}</>
              )}
            </BoxResultSearch>
          </Container>
          <KahootBottomSheet
            ref={bottomSheetModalRef}
            kahootDetailConfig={kahootDetailConfig}
          />
        </SafeAreaView>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}
