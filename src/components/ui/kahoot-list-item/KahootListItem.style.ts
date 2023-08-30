import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    borderRadius: 3,
    overflow: 'hidden',
    backgroundColor: '#fff',
    shadowColor: '#000',
    elevation: 1,
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
    fontWeight: '600',
    backgroundColor: '#00000080',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 2,
  },
  rightContainer: {
    padding: 8,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    flex: 1,
  },
  draft: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 2,
    position: 'absolute',
    left: 4,
    top: 4,
  },
  title: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
  },
  visibleScopeContainer: {
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center',
  },
});
