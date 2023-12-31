import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#00000040',
    elevation: 4,
    flexDirection: 'row',
  },
  coverImage: {
    width: 150,
    height: 100,
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
    fontFamily: 'Poppins-Bold',
    backgroundColor: '#00000080',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 2,
  },
  rightContainer: {
    flex: 1,
    padding: 8,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
  draft: {
    color: '#fff',
    fontSize: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 2,
    position: 'absolute',
    left: 4,
    top: 4,
    fontFamily: 'Poppins-Bold',
  },
  title: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
  },
  visibleScopeContainer: {
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center',
  },
});
