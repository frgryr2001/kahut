import {StyleSheet} from 'react-native';
import type {Theme} from '@react-navigation/native';

export const styles = StyleSheet.create({
  globalMargin: {
    marginHorizontal: 20,
  },
  globalPadding: {
    paddingHorizontal: 20,
  },
  globalPadding10: {
    paddingHorizontal: 10,
  },
});

const LightTheme = {
  dark: false,
  colors: {
    primary: 'rgb(0, 122, 255)',
    background: 'rgb(238, 238, 228)', //
    card: 'rgb(255, 255, 255)',
    text: 'rgb(17, 17, 17)', //
    border: 'rgb(216, 216, 216)',
    notification: 'rgb(255, 59, 48)',
  },
};

const DarkTheme: Theme = {
  dark: true,
  colors: {
    primary: 'rgb(10, 132, 255)',
    background: 'rgb(1, 1, 1)',
    card: 'rgb(18, 18, 18)',
    text: 'rgb(229, 229, 231)',
    border: 'rgb(39, 39, 41)',
    notification: 'rgb(255, 69, 58)',
  },
};

export {LightTheme, DarkTheme};
