import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },

  // Sections
  sectionName: {
    fontSize: 16,
    fontWeight: '700',
  },
  sectionItemsContainer: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#ddd',
    gap: 1,
    elevation: 4,
    shadowColor: '#00000040',
    overflow: 'hidden',
  },
  sectionItemContainer: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
