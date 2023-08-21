import {View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import DatePicker from 'react-native-date-picker';
import Icon from 'react-native-vector-icons/Ionicons';

export default function SettingAssignment({
  date,
  handleChangeDate,
}: {
  date: Date;
  handleChangeDate: (date: Date) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <View>
      <TouchableOpacity activeOpacity={0.7} onPress={() => setOpen(true)}>
        <Icon name="calendar-outline" size={25} color="#000" />
      </TouchableOpacity>
      <DatePicker
        modal
        open={open}
        date={date}
        onConfirm={dateChange => {
          setOpen(false);
          handleChangeDate(dateChange);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </View>
  );
}
