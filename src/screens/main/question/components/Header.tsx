import React from 'react';
import {StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';

const Header = () => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        {/* Cancel */}
        <TouchableWithoutFeedback>
          <Text style={styles.headerAction}>Cancel</Text>
        </TouchableWithoutFeedback>
        {/* Title */}
        <Text style={styles.headerTitle}>Create Question</Text>
        {/* Save */}
        <TouchableWithoutFeedback>
          <Text style={styles.headerAction}>Save</Text>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    height: 60,
    backgroundColor: 'white',
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 3,
  },
  headerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerAction: {
    fontFamily: 'Poppins-Bold',
    color: 'black',
  },
  headerTitle: {
    fontFamily: 'Poppins-Bold',
    color: 'black',
    fontSize: 16,
  },
});

export default Header;
