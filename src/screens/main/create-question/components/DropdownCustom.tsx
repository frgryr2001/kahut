import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
const data = [
  {label: 'Quiz', type: 'quiz'},
  {label: 'True or False', type: 'tf'},
];
interface Props {
  typeQuestion: string;
}
export const DropdownCustom = ({typeQuestion}: Props) => {
  const [value, setValue] = useState(function () {
    if (typeQuestion === 'quiz') {
      return 'quiz';
    }
    return 'tf';
  });
  const [isFocus, setIsFocus] = useState(false);

  useEffect(() => {
    setValue(typeQuestion);
  }, [typeQuestion]);

  return (
    <View style={styles.container}>
      <Dropdown
        style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        iconStyle={styles.iconStyle}
        data={data}
        maxHeight={300}
        labelField="label"
        valueField="type"
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setValue(item.type);
          setIsFocus(false);
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 0.4,
  },
  dropdown: {
    height: 50,
    borderRadius: 8,
    paddingHorizontal: 4,
    backgroundColor: '#F5F5F5',
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
