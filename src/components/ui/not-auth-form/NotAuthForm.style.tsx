import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  notAuthContainer: {
    gap: 16,
  },
  notAuthTitle: {
    fontWeight: '800',
    fontSize: 18,
    textAlign: 'center',
  },
  notAuthDesc: {
    fontSize: 16,
    color: '#777',
    textAlign: 'center',
  },
  notAuthButtonGroup: {
    flexDirection: 'row',
    gap: 16,
    justifyContent: 'center',
  },
  notAuthButtonContainer: {
    paddingHorizontal: 36,
    paddingVertical: 14,
    borderRadius: 4,
    alignItems: 'center',
  },
  notAuthButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '700',
  },
});
