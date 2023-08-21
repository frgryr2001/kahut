import {DateTime} from 'luxon';

export const formattedDate = (time: number) =>
  DateTime.fromMillis(time).toLocaleString(DateTime.DATETIME_MED);
