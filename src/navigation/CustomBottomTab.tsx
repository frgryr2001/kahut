import React from 'react';
import {View, Text, StyleSheet, TouchableNativeFeedback} from 'react-native';
import {getIcon} from '../helpers/getIcon';

function CustomBottomTab({state, descriptors, navigation}: any) {
  return (
    <View style={styles.tabBottomItem}>
      {state.routes.map((route: any, index: any) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;
        let iconName: string = '';
        if (route.name === 'Home') {
          iconName = isFocused ? 'home' : 'home-outline';
        } else if (route.name === 'Create') {
          iconName = isFocused ? 'plus-circle' : 'plus-circle-outline';
        } else if (route.name === 'Library') {
          iconName = isFocused
            ? 'bookmark-box-multiple'
            : 'bookmark-box-multiple-outline';
        } else if (route.name === 'Discover') {
          iconName = isFocused ? 'compass' : 'compass-outline';
        } else if (route.name === 'Join') {
          iconName = isFocused ? 'view-grid' : 'view-grid-outline';
        }

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({name: route.name, merge: true});
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableNativeFeedback
            key={route.key + index}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}>
            <View style={styles.btn}>
              {getIcon(iconName, 25, isFocused ? '#673ab7' : '#868e96')}
              <Text
                style={{
                  color: isFocused ? '#673ab7' : 'black',
                  fontFamily: 'Poppins-Medium',
                  fontSize: 12,
                }}>
                {label}
              </Text>
            </View>
          </TouchableNativeFeedback>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  btn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabBottomItem: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: 'white',
    borderWidth: 0,
    elevation: 0,
  },
});

export default CustomBottomTab;
