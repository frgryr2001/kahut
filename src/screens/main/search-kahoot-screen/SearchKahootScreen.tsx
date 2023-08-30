import React, {useCallback} from 'react';
import {SearchInput} from './components/SearchInput';
import {SafeAreaView} from 'react-native';
import Container from './components/Container';
import BoxResultSearch from './components/BoxResultSearch';
import UserListSearch from './components/UserListSearch';
import KahootListSearch from './components/KahootListSearch';

export default function SearchKahootScreen() {
  const [searchText, setSearchText] = React.useState('');
  console.log('searchText', searchText);

  const onSearch = useCallback((value: string) => {
    setSearchText(value);
  }, []);

  const handleSearchSubmit = useCallback(() => {
    console.log('searchText', searchText);
  }, [searchText]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <Container>
        <SearchInput
          onDebounce={onSearch}
          handleSearchSubmit={handleSearchSubmit}
        />
        <BoxResultSearch>
          {/* user result search */}
          <UserListSearch />
          {/* kahoot result search */}
          <KahootListSearch />
        </BoxResultSearch>
      </Container>
    </SafeAreaView>
  );
}
