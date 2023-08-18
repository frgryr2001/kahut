import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    padding: 16,
  },
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
  authContainer: {
    borderRadius: 4,
    overflow: 'hidden',
    rowGap: 10,

    gap: 1,
  },
  authItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    padding: 16,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 3,
  },
  authItemTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
});
