import React, {useCallback, useEffect, useState} from 'react';
import {ModalCustom} from '../ModalCustom';
import {View, TextInput, Text, Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useTheme} from '@react-navigation/native';
import {Button} from '../Button';
import {createShare} from '../../../services/share/share.service';
import {useDebounce} from '../../../hooks/useDebounce';
import Snackbar from 'react-native-snackbar';
import {useFetch} from '../../../hooks/useFetch';

type IDataSearch = {
  id: number;
  username: string;
  name: string;
  image: string;
};

export default function ModalShare({
  modalShareVisible,
  onCloseModal,
  kahootId,
}: {
  modalShareVisible: boolean;
  onCloseModal: () => void;
  kahootId: number;
}) {
  const [searchDebounce, setSearchDebounce] = useState<string>('');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const {data: filteredUsers, isLoading: isSearching} = useFetch<IDataSearch[]>(
    `users/filter?k=${searchDebounce}`,
  );

  const handleSearch = useCallback((text: string) => {
    setSearchDebounce(text);
  }, []);

  const addUserShare = (username: string) => {
    if (selectedUsers.includes(username)) {
      return;
    }
    setSelectedUsers(prev => [...prev, username]);
  };
  const removeUserShare = (username: string) => {
    setSelectedUsers(prev => prev.filter(user => user !== username));
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
      Snackbar.show({
        text: 'Share successfully',
        backgroundColor: 'green',
        duration: Snackbar.LENGTH_SHORT,
      });
    }
  };

  const isSelectedUsers = (username: string) => {
    return selectedUsers.includes(username);
  };

  return (
    <ModalCustom
      modalVisible={modalShareVisible}
      title="Share kahoot"
      onCloseModal={() => {
        onCloseModal();
        setSelectedUsers([]);
      }}>
      <SearchInput handleSearch={handleSearch} />
      <ChipTag
        selectedUsers={selectedUsers}
        removeUserShare={removeUserShare}
      />
      <ListUser
        users={filteredUsers!}
        addUserShare={addUserShare}
        isSearching={isSearching && searchDebounce !== ''}
        isSelectedUsers={isSelectedUsers}
      />
      <ButtonAction
        onCloseModal={() => {
          onCloseModal();
          setSelectedUsers([]);
          setSearchDebounce('');
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

  const debounceValue = useDebounce(search, 500);

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
          borderRadius: 4,
          borderWidth: 1,
          paddingHorizontal: 10,
          fontFamily: 'Poppins-Regular',
        }}
        onChangeText={text => setSearch(text)}
        placeholder="Search user..."
        autoCapitalize="none"
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
  isSearching,
  isSelectedUsers,
}: {
  users: IDataSearch[];
  addUserShare: (username: string) => void;
  isSearching: boolean;
  isSelectedUsers: (username: string) => boolean;
}) {
  return (
    <View
      style={{
        marginTop: 10,
        gap: 10,
      }}>
      {isSearching ? (
        <Text
          style={{
            fontSize: 16,
            fontFamily: 'Poppins-Regular',
            textAlign: 'center',
          }}>
          Searching...
        </Text>
      ) : (
        <>
          {users === undefined ? (
            <></>
          ) : (
            <Text
              style={{
                fontSize: 16,
                fontFamily: 'Poppins-Regular',
              }}>
              <Text
                style={{
                  fontWeight: 'bold',
                  color: 'black',
                }}>
                {users.length}
              </Text>{' '}
              results
            </Text>
          )}
          {(users ?? []).map(user => {
            return (
              <UserItem
                key={user.id}
                user={user}
                onAddUserShare={addUserShare}
                isSelectedUsers={isSelectedUsers(user.username)}
              />
            );
          })}
        </>
      )}
    </View>
  );
}

function UserItem({
  user,
  onAddUserShare,
  isSelectedUsers,
}: {
  user: IDataSearch;
  onAddUserShare: (username: string) => void;
  isSelectedUsers: boolean;
}) {
  const {colors} = useTheme();
  return (
    <Pressable
      onPress={() => onAddUserShare(user.username)}
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      <Text
        style={{
          fontSize: 16,
          color: colors.text,
          fontFamily: 'Poppins-Regular',
        }}>
        {user.username}
      </Text>

      {isSelectedUsers ? (
        <Icon name="checkmark-outline" size={25} color="green" />
      ) : (
        <Icon name="add-outline" size={25} color="black" />
      )}
    </Pressable>
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
      }}>
      {selectedUsers.map(user => (
        <Pressable
          key={user}
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
              fontFamily: 'Poppins-Regular',
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
          shadowColor: '#fff',
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
