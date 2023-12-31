import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemContainer: {
    padding: 8,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    gap: 8,
    shadowColor: '#00000040',
    elevation: 4,
  },
  itemTitle: {
    height: 40,
    textAlignVertical: 'center',
    fontFamily: 'Poppins-Medium',
  },
  itemImage: {
    width: '100%',
    height: 160,
    objectFit: 'cover',
    borderRadius: 8,
  },
});

export default styles;
