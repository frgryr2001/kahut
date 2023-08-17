import React, {useState, useEffect} from 'react';
import {UserInfo, KahootsList} from './components';
import {getUserDetail} from '../../../services/user/user.service';
import {getKahootsList} from '../../../services/kahoot/kahoot.service';
import {UserDetail} from '../../../types/user.type';
import {KahootSummary} from '../../../types/kahoot.type';
import {useSelector} from 'react-redux';
import {selectUser} from '../../../redux/slices/authSlice/selector';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';

const UserDetailScreen = ({route}: any) => {
  const {id}: {id: number} = route.params;
  const [userDetail, setUserDetail] = useState<UserDetail>();
  const [kahootsList, setKahootsList] = useState<KahootSummary[]>();
  const authState = useSelector(selectUser);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const isMyKahoots = (authState && userDetail?.id === authState.id) ?? false;

  return (
    <GestureHandlerRootView
      style={{
        flex: 1,
      }}>
      <BottomSheetModalProvider>
        <UserInfo data={userDetail} />
        <KahootsList data={kahootsList} isMyKahoots={isMyKahoots} />
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default UserDetailScreen;
