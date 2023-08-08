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
    shadowColor: '#000',
    elevation: 4,
  },
  itemTitle: {
    height: 40,
    // alignItems: 'center',
    textAlignVertical: 'center',
    // justifyContent: 'center',
    fontWeight: '700',
  },
  itemImage: {
    width: '100%',
    height: 160,
    objectFit: 'cover',
    borderRadius: 8,
  },
});

export default styles;
