import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    borderRadius: 8,
    overflow: 'hidden',
    shadowColor: '#000',
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
  },
  draftContainer: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  draft: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
});
