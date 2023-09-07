import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  sectionName: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
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
