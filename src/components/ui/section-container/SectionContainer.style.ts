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
    gap: 16,
  },
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  text: {
    fontSize: 18,
    fontFamily: 'Poppins-Medium',
    lineHeight: 24,
    flex: 1,
  },
});

export default styles;
