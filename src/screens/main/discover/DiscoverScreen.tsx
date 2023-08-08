import React, {useState, useEffect} from 'react';
import {SafeAreaView, ScrollView, View, ActivityIndicator} from 'react-native';
import {useTheme} from '@react-navigation/native';

import {
  BannerSlider,
  SectionContainer,
  KahootSlider,
} from '../../../components/ui';
import {getUsersList} from '../../../services/user/user.service';
import {UserSummary} from '../../../types/user.type';
import styles from './DiscoverScreen.style';

interface Props {
  navigation: any;
}

const KAHOOT = {
  coverImage:
    'https://storage.googleapis.com/kahoot-nodejs-c67a0.appspot.com/images/rn_image_picker_lib_temp_6e5105db-7880-4419-b2d2-60a2f59406d6.jpg?GoogleAccessId=firebase-adminsdk-kkws4%40kahoot-nodejs-c67a0.iam.gserviceaccount.com&Expires=16730323200&Signature=yvNrYFVHePxs%2F7p2nBbm4LWz7HfBGbYbhbsdep%2BNxFCpepz4hbyUgAq0UyJmwCo0OSJr7PWn5ia85z6JeyDZQAcYXekxStigzD3tz58m60ZvriNDQEdpX3HUi2bIScYlJzO5OcldyD1RWWJmweTzPSmXk%2BuZWhO%2FmxiVfnDz7jWds1yA5q3tFiAZS6gqt3yOaCYqKF4SxDV59ApSLRaG1GJ4EqSNnN3xkwEKx3jAg8z8Tfz6iEDwJOzKdVXiCGsfxXx63ws8Fl%2FhiKVkvvmgX9iK4NW9p%2BHVDyYqgaS8uENF6f8%2BLsDL6aabB5QPE%2FC0obJuGymPWQSOwqjLkLdQ9A%3D%3D',
  createdAt: 1691242600000,
  id: 53,
  numberOfQuestion: 3,
  title: 'Do you know Beckham?',
  userId: 31,
  userImage:
    'https://storage.googleapis.com/kahoot-nodejs-c67a0.appspot.com/images/default-avt.jpg?GoogleAccessId=firebase-adminsdk-kkws4%40kahoot-nodejs-c67a0.iam.gserviceaccount.com&Expires=16730298000&Signature=rhW5g%2ByrJxxOJJS54Kpx00QzFLIwI5RItJtTeKhNmjSck2UfMyS%2BEDXjfAds0jICPHKXfr5YQw8KdiSruAjqX%2Fwr07Uw0U13Jj5eF%2FArn4sODgxfStanW2f9jU%2FC7VgU2PWfzsZBSZUCz6DD9dFizdMZwgSpxp2xRAncwSrlapRhSkfU2JL2NJ9SYt4COz7fdcvOp3VTq9ps4NbXlUmBPC3T78LgZsVjyV3ft6VyZYyHQFircMBnRtUsOYooPlnCYgHX8aMYgCZEOp1Ggy%2FSPmSiQthcnqouO4DDn2g53jSb7fMNpMK8CkOyJqR1BAgfgpEYt%2BVl7DNiaD80zeDxqA%3D%3D',
  username: 'nhân-hoàng-lcX5yP',
  visibleScope: 'public',
};

const DiscoverScreen = ({navigation}: Props) => {
  const {colors} = useTheme();
  const [usersList, setUsersList] = useState<UserSummary>();
  const [isFetching, setIsFetching] = useState<boolean>(true);

  useEffect(() => {
    getUsersList().then(data => {
      setUsersList(data);
      setIsFetching(false);
    });
  }, []);

  return (
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <BannerSlider />

          <SectionContainer
            title="McGraw Hill"
            onPressSeeAll={() => navigation.navigate('')}>
            <KahootSlider kahootsList={[KAHOOT]} />
          </SectionContainer>

          <SectionContainer
            title="McGraw Hill"
            onPressSeeAll={() => navigation.navigate('')}>
            <KahootSlider kahootsList={[KAHOOT]} />
          </SectionContainer>

          <SectionContainer
            title="McGraw Hill"
            onPressSeeAll={() => navigation.navigate('')}>
            <KahootSlider kahootsList={[KAHOOT]} />
          </SectionContainer>

          {isFetching && (
            <View style={styles.loading}>
              <ActivityIndicator color={colors.text} size={40} />
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DiscoverScreen;
