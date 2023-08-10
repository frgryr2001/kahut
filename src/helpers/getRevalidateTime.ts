import {DateTime} from 'luxon';

export const getRevalidateTime = (date: string) => {
  return DateTime.fromISO(date).setLocale('vi-VN').toRelative();
};
