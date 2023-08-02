import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    gap: 0,
  },
  headingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  text: {
    fontSize: 18,
    fontWeight: '700',
  },
});

export default styles;
