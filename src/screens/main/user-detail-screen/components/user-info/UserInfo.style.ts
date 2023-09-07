import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 16,
    gap: 16,
    elevation: 4,
    shadowColor: '#00000040',
  },
  avatarAndUsernameContainer: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 999,
    objectFit: 'cover',
    borderColor: '#00000020',
    borderWidth: 1,
  },
  username: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
  },
  statisticContainer: {
    flexDirection: 'row',
    gap: 48,
  },
  statisticItemContainer: {
    alignItems: 'center',
  },
  statisticValue: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
  },
  statisticSection: {
    fontSize: 14,
    color: '#777',
    fontFamily: 'Poppins-Regular',
  },
  loading: {
    height: 150,
    justifyContent: 'center',
    backgroundColor: '#fff',
    elevation: 4,
    shadowColor: '#00000040',
  },
});
