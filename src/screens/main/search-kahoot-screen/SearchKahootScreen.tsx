import React, {useCallback, useRef} from 'react';
import {SearchInput} from './components/SearchInput';
import {
  SafeAreaView,
  ActivityIndicator,
  View,
  Text,
  Pressable,
  ScrollView,
  Dimensions,
} from 'react-native';
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
  const [searchResult, setSearchResult] = React.useState<SearchData>();
  const [isSearching, setIsSearching] = React.useState(false);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [kahootDetailConfig, setKahootDetailConfig] = React.useState<{
    kahootID: number;
    isMyKahoot: boolean;
  }>();
  const HEIGHT = Dimensions.get('window').height;

  // open bottom sheet
  const handlePresentModalPress = React.useCallback((kahootID: number) => {
    setKahootDetailConfig({kahootID, isMyKahoot: false});
    bottomSheetModalRef.current?.present();
  }, []);

  const handleSearch = useCallback(async (value: string) => {
    try {
      if (!value.trim()) {
        setSearchResult(undefined);
        return;
      }

      setIsSearching(true);
      const res = await search(value);
      setIsSearching(false);
      setSearchResult(res.data);
    } catch (error) {
      setIsSearching(false);
    }
  }, []);

  return (
    <GestureHandlerRootView
      style={{
        flex: 1,
      }}>
      <BottomSheetModalProvider>
        <SafeAreaView style={{flex: 1}}>
          <View style={{paddingVertical: 0, paddingHorizontal: 8}}>
            {/* Header */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
                paddingHorizontal: 8,
                paddingTop: 16,
              }}>
              <SearchInput onSearch={handleSearch} />
              <Pressable onPress={() => navigation.goBack()}>
                <Text
                  style={{
                    color: colors.text,
                    fontFamily: 'Poppins-Bold',
                    fontSize: 14,
                  }}>
                  Cancel
                </Text>
              </Pressable>
            </View>

            {/* Search result */}
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{marginVertical: 16, height: HEIGHT - 46 - 32}}>
              {/* user result search */}
              {isSearching ? (
                <View
                  style={{
                    // flex: 1,
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
                <>
                  {!searchResult && (
                    <View
                      style={{
                        justifyContent: 'center',
                        paddingHorizontal: 8,
                      }}>
                      <Text
                        style={{
                          color: colors.text,
                          fontFamily: 'Poppins-Regular',
                        }}>
                        Please enter the search keyword!
                      </Text>
                    </View>
                  )}

                  {searchResult &&
                    searchResult.users.length === 0 &&
                    searchResult.kahoots.length === 0 && (
                      <View
                        style={{
                          justifyContent: 'center',
                          paddingHorizontal: 8,
                        }}>
                        <Text
                          style={{
                            color: colors.text,
                            fontFamily: 'Poppins-Regular',
                          }}>
                          No result found!
                        </Text>
                      </View>
                    )}

                  {searchResult &&
                    (searchResult.users.length > 0 ||
                      searchResult.kahoots.length > 0) && (
                      <View style={{gap: 16}}>
                        <UserListSearch users={searchResult.users} />
                        <KahootListSearch
                          kahoots={searchResult.kahoots}
                          handlePresentModalPress={handlePresentModalPress}
                        />
                      </View>
                    )}
                </>
              )}
            </ScrollView>
          </View>

          <KahootBottomSheet
            ref={bottomSheetModalRef}
            kahootDetailConfig={kahootDetailConfig}
          />
        </SafeAreaView>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}
