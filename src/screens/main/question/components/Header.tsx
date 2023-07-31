import React from 'react';
import {StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import {Question} from '../../../../types/question';
import {useAppDispatch} from '../../../../redux/store';
import {deleteKahoot} from '../../../../redux/slices/questionSlice/reducer';
import {createKahoot} from '../../../../redux/slices/questionSlice/action';

interface Props {
  completed: boolean;
  kahoot: Question | undefined;
  navigation: any;
}

const Header = ({navigation, completed, kahoot}: Props) => {
  const dispatch = useAppDispatch();

  const onSave = async () => {
    dispatch(createKahoot(kahoot!))
      .unwrap()
      .then(() => {
        dispatch(
          deleteKahoot({
            kahootId: kahoot?.idQuestion!,
          }),
        );
        navigation.navigate('Library');
      });

    // try {
    //   const config = {
    //     method: 'POST',
    //     headers: {
    //       Authorization: `Bearer ${access_token}`,
    //       Accept: 'application/json',
    //       'Content-Type': 'multipart/form-data',
    //     },
    //     body: formData,
    //   };
    //   const res = await fetch(
    //     'https://867b-14-169-89-177.ngrok-free.app/dacnnt2/api/v1/kahoots',
    //     config,
    //   );

    //   const data = await res.json();

    //   console.log('data', data);
    // } catch (error) {
    //   console.log('error', error);
    // }
  };

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
        <TouchableWithoutFeedback onPress={onSave}>
          <Text
            style={[
              styles.headerAction,
              {
                color: completed ? 'black' : '#C7C7CC',
              },
            ]}>
            Save
          </Text>
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
