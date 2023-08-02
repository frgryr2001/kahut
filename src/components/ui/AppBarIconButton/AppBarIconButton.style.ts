import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  normalButton: {
    display: 'flex',
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  outlineButton: {
    display: 'flex',
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 999,
    backgroundColor: '#fff',
  },
});
