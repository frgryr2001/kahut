import React, {useState, useEffect} from 'react';
import {View} from 'react-native';

import {UserInfo, KahootsList} from './components';
import {getUserDetail} from '../../../services/user/user.service';
import {getKahootsList} from '../../../services/kahoot/kahoot.service';
import {UserDetail} from '../../../types/user.type';
import {KahootSummary} from '../../../types/kahoot.type';

const UserDetailScreen = ({route}: any) => {
  const {id}: {id: number} = route.params;
  const [userDetail, setUserDetail] = useState<UserDetail>();
  const [kahootsList, setKahootsList] = useState<KahootSummary[]>();

  const getUserDetailRequest = async () => {
    const response = await getUserDetail({id});
    setUserDetail(response);
  };

  const getKahootsListRequest = async () => {
    const response = await getKahootsList({userId: id});
    setKahootsList(response.kahoots);
  };

  useEffect(() => {
    getUserDetailRequest();
    getKahootsListRequest();
  }, [id]);

  return (
    <View>
      <UserInfo data={userDetail} />
      <KahootsList data={kahootsList} />
    </View>
  );
};

export default UserDetailScreen;
