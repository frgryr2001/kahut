import React, {useEffect} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import Icons from 'react-native-vector-icons/Ionicons';
import {useDebounce} from '../../../../hooks/useDebounce';
import {useTheme} from '@react-navigation/native';

interface Props {
  onSearch: (value: string) => void;
}

export const SearchInput = React.memo(({onSearch}: Props) => {
  const {colors} = useTheme();
  const [textValue, setTextValue] = React.useState('');
  const debounceValue = useDebounce(textValue);

  useEffect(() => {
    onSearch(debounceValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceValue]);

  return (
    <>
      <View style={styles.textBackground}>
        <TextInput
          placeholder="Search"
          style={{
            ...styles.textInput,
            color: colors.text,
          }}
          autoCapitalize="none"
          autoCorrect={false}
          value={textValue}
          onChangeText={setTextValue}
          autoFocus={true}
        />
        {textValue.length > 0 && (
          <Icons
            name="close"
            color="#777"
            size={24}
            onPress={() => setTextValue('')}
          />
        )}
      </View>
    </>
  );
});

const styles = StyleSheet.create({
  textBackground: {
    flex: 1,
    backgroundColor: '#F3F1F3',
    borderRadius: 4,
    height: 46,
    paddingVertical: 0,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    shadowColor: '#000000',
    elevation: 4,
  },
  textInput: {
    fontSize: 16,
    flex: 1,
    fontFamily: 'Poppins-Regular',
  },
});
