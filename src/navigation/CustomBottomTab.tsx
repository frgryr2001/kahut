import React from 'react';
import {View, Text, StyleSheet, TouchableNativeFeedback} from 'react-native';
import {getIcon} from '../helpers/getIcon';

function CustomBottomTab({state, descriptors, navigation}: any) {
  return (
    <View style={{flexDirection: 'row', height: 60}}>
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
          iconName = isFocused ? 'add-circle' : 'add-circle-outline';
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
              {getIcon(iconName, 25, isFocused ? '#673ab7' : '#222')}
              <Text style={{color: isFocused ? '#673ab7' : '#222'}}>
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
});

export default CustomBottomTab;
