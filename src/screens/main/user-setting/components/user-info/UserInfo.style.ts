import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  userInfoImage: {
    objectFit: 'cover',
    borderRadius: 999,
  },
  userInfoUsername: {
    fontWeight: '700',
    fontSize: 16,
    flex: 1,
  },
});
