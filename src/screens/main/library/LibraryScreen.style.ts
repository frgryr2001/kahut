import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    padding: 16,
    gap: 16,
  },
  sectionContainer: {
    borderRadius: 4,
    overflow: 'hidden',
    shadowColor: '#00000040',
    elevation: 2,
    backgroundColor: '#ddd',
    gap: 1,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    padding: 16,
    backgroundColor: '#fff',
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
});
