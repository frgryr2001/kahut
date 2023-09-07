import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    borderRadius: 8,
    overflow: 'hidden',
    shadowColor: '#00000040',
    elevation: 4,
  },
  coverImage: {
    width: '100%',
    height: 120,
    position: 'relative',
    objectFit: 'cover',
    resizeMode: 'cover',
  },
  numberOfQuestion: {
    position: 'absolute',
    right: 4,
    bottom: 4,
    color: '#fff',
    fontSize: 12,
    backgroundColor: '#00000080',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 2,
    fontFamily: 'Poppins-Bold',
  },
  bottomContainer: {
    padding: 8,
    height: 80,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
  draftContainer: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  draft: {
    color: '#fff',
    fontSize: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 2,
    fontFamily: 'Poppins-Bold',
  },
  title: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  userImage: {
    width: 20,
    height: 20,
    borderRadius: 999,
    objectFit: 'cover',
  },
  username: {
    flex: 1,
    color: '#777',
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
  },
});
