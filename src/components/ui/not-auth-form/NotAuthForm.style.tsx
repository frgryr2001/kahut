import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  notAuthContainer: {
    gap: 16,
  },
  notAuthTitle: {
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'Poppins-Bold',
  },
  notAuthDesc: {
    fontSize: 16,
    color: '#777',
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
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
    color: '#fff',
    fontFamily: 'Poppins-Bold',
  },
});
