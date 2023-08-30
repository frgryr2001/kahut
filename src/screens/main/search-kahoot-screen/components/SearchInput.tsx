import React, {useEffect} from 'react';
import {Platform, StyleSheet, TextInput, View} from 'react-native';
import Icons from 'react-native-vector-icons/Ionicons';
import {useDebounce} from '../../../../hooks/useDebounce';

interface Props {
  onDebounce: (value: string) => void;
  handleSearchSubmit: () => void;
}

export const SearchInput = React.memo(
  ({onDebounce, handleSearchSubmit}: Props) => {
    const [textValue, setTextValue] = React.useState('');
    const value = useDebounce(textValue, 150);

    useEffect(() => {
      onDebounce(value);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    return (
      <>
        <View style={styles.textBackground}>
          <TextInput
            placeholder="Search kahoot"
            style={{
              ...styles.textInput,
              top: Platform.OS === 'ios' ? 0 : 2,
            }}
            autoCapitalize="none"
            autoCorrect={false}
            value={textValue}
            onChangeText={setTextValue}
            autoFocus={true}
          />
          <Icons
            name="search-outline"
            color="gray"
            size={25}
            onPress={() => handleSearchSubmit()}
          />
        </View>
      </>
    );
  },
);

const styles = StyleSheet.create({
  textBackground: {
    flex: 1,
    backgroundColor: '#F3F1F3',
    borderRadius: 10,
    height: 45,
    marginTop: 10,
    paddingVertical: Platform.OS === 'ios' ? 0 : 3,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 4,
  },
  textInput: {
    fontSize: 16,
    color: 'black',
    flex: 1,
  },
});
