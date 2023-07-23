import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {DropdownCustom} from './DropdownCustom';

interface Props {
  navigation: any;
  typeQuestion: string;
}

export const Header = ({navigation, typeQuestion}: Props) => {
  return (
    <View style={styles.container}>
      {/* icon back */}
      <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.goBack()}>
        <Icon name="chevron-down-outline" size={25} color={'black'} />
      </TouchableOpacity>
      {/* Type question */}
      <DropdownCustom typeQuestion={typeQuestion} />
      {/* icon option */}
      <TouchableOpacity activeOpacity={0.9} onPress={() => console.log('ok')}>
        <Icon name="ellipsis-vertical" size={25} color={'black'} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 60,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
