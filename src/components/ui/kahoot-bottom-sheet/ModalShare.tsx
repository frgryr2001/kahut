import React, {useCallback, useEffect, useState} from 'react';
import {ModalCustom} from '../ModalCustom';
import {View, TextInput, Text, Pressable, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useTheme} from '@react-navigation/native';
import {Button} from '../Button';
import {getUsersList} from '../../../services/user/user.service';
import {createShare} from '../../../services/share/share.service';
import {useDebounce} from '../../../hooks/useDebounce';
import {useSelector} from 'react-redux';
import {selectUser} from '../../../redux/slices/authSlice/selector';

export default function ModalShare({
  modalShareVisible,
  onCloseModal,
  kahootId,
}: {
  modalShareVisible: boolean;
  onCloseModal: () => void;
  kahootId: number;
}) {
  const userAuth = useSelector(selectUser);
  const [users, setUsers] = useState<string[]>([]);
  const [searchDebounce, setSearchDebounce] = useState<string>('');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    const getUsers = async () => {
      const data = await getUsersList();
      const userNameList = data.map(user => user.name);
      setUsers(userNameList);
    };
    getUsers();
  }, []);

  const handleSearch = useCallback((text: string) => {
    setSearchDebounce(text);
  }, []);

  const filteredUsers = users.filter(name => {
    if (searchDebounce === '') {
      return false;
    }
    if (userAuth) {
      if (name === userAuth.username) {
        return false;
      }
    }
    return name.toLowerCase().includes(searchDebounce.toLowerCase());
  });

  const addUserShare = (username: string) => {
    if (selectedUsers.includes(username)) {
      return;
    }
    setSelectedUsers(prev => [...prev, username]);
    setUsers(prev => prev.filter(user => user !== username));
  };
  const removeUserShare = (username: string) => {
    setSelectedUsers(prev => prev.filter(user => user !== username));
    setUsers(prev => [...prev, username]);
  };

  const handleShare = async () => {
    if (selectedUsers.length === 0) {
      return;
    }
    setLoading(true);
    const res = await createShare(kahootId, selectedUsers);
    if (res.code === 200) {
      setSelectedUsers([]);
      setLoading(false);
      Alert.alert('Share success');
    }
  };

  return (
    <ModalCustom
      modalVisible={modalShareVisible}
      title="Share with kahoot!"
      onCloseModal={() => {
        onCloseModal();
        setSelectedUsers([]);
      }}>
      <SearchInput handleSearch={handleSearch} />
      <ChipTag
        selectedUsers={selectedUsers}
        removeUserShare={removeUserShare}
      />
      <ListUser users={filteredUsers} addUserShare={addUserShare} />
      <ButtonAction
        onCloseModal={() => {
          onCloseModal();
          setSelectedUsers([]);
        }}
        onShareKahoot={handleShare}
        loading={loading}
      />
    </ModalCustom>
  );
}

function SearchInput({handleSearch}: {handleSearch: (text: string) => void}) {
  const {colors} = useTheme();
  const [search, setSearch] = useState('');

  const debounceValue = useDebounce(search, 250);

  useEffect(() => {
    handleSearch(debounceValue);
  }, [debounceValue, handleSearch]);

  return (
    <View
      style={{
        position: 'relative',
      }}>
      <TextInput
        style={{
          height: 45,
          borderColor: colors.border,
          borderWidth: 1,
          paddingHorizontal: 10,
        }}
        onChangeText={text => setSearch(text)}
        value={search}
      />
      {search && (
        <Icon
          onPress={() => setSearch('')}
          name="close-outline"
          size={30}
          color="black"
          style={{
            position: 'absolute',
            right: 10,
            top: 5,
          }}
        />
      )}
    </View>
  );
}

function ListUser({
  users,
  addUserShare,
}: {
  users: string[];
  addUserShare: (username: string) => void;
}) {
  return (
    <View
      style={{
        marginTop: 10,
      }}>
      {users.map(user => (
        <UserItem key={user} user={user} onAddUserShare={addUserShare} />
      ))}
    </View>
  );
}

function UserItem({
  user,
  onAddUserShare,
}: {
  user: string;
  onAddUserShare: (username: string) => void;
}) {
  const {colors} = useTheme();
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      <Text
        style={{
          fontSize: 16,
          color: colors.text,
        }}>
        {user}
      </Text>
      <Icon
        name="add-outline"
        size={25}
        color="black"
        onPress={() => onAddUserShare(user)}
      />
    </View>
  );
}
function ChipTag({
  selectedUsers,
  removeUserShare,
}: {
  selectedUsers: string[];
  removeUserShare: (username: string) => void;
}) {
  const {colors} = useTheme();
  return (
    <View
      style={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 10,
      }}>
      {selectedUsers.map((user, index) => (
        <>
          <Pressable
            key={index}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#ccc',
              padding: 5,
              borderRadius: 3,
              margin: 5,
            }}>
            <Text
              style={{
                color: colors.text,
              }}>
              {user}
            </Text>
            <Icon
              name="close-outline"
              size={25}
              color="black"
              onPress={() => removeUserShare(user)}
            />
          </Pressable>
        </>
      ))}
    </View>
  );
}
function ButtonAction({
  onCloseModal,
  onShareKahoot,
  loading,
}: {
  onCloseModal: () => void;
  onShareKahoot: () => void;
  loading: boolean;
}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
        gap: 10,
      }}>
      <Button
        title="Cancel"
        onPress={() => {
          onCloseModal();
        }}
        size="medium"
        width={'50%'}
        style={{
          backgroundColor: '#ccc',
        }}
      />
      <Button
        title="Share"
        onPress={() => {
          onShareKahoot();
        }}
        size="medium"
        isActive
        width={'50%'}
        loading={loading}
        disabled={loading}
      />
    </View>
  );
}
