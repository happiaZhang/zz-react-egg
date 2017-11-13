const TRANSLATOR = {
  1: 'JANUARY',
  2: 'FEBRUARY',
  3: 'MARCH',
  4: 'APRIL',
  5: 'MAY',
  6: 'JUNE',
  7: 'JULY',
  8: 'AUGUST',
  9: 'SEPTEMBER',
  10: 'OCTOBER',
  11: 'NOVEMBER',
  12: 'DECEMBER'
};

const format = (newDate, fmt) => {
  const date = {
    'M+': newDate.getMonth() + 1,
    'd+': newDate.getDate(),
    'h+': newDate.getHours(),
    'm+': newDate.getMinutes(),
    's+': newDate.getSeconds(),
    'q+': Math.floor((newDate.getMonth() + 3) / 3),
    'S+': newDate.getMilliseconds()
  };
  if (/(y+)/i.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (newDate.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  for (const k in date) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? date[k] : ('00' + date[k]).substr(('' + date[k]).length));
    }
  }
  return fmt;
};

const year = (newDate) => (newDate.getFullYear());

const month = (newDate) => (newDate.getMonth() + 1);

const day = (newDate) => (newDate.getDate());

const time = (newDate) => (newDate.getTime());

const weekday = (newDate) => (newDate.getDay() || 7);

const convertMonth = (month) => (TRANSLATOR[month]);

const add = (newDate, days) => {
  newDate.setDate(day(newDate) + days);
};

const currentTime = () => {
  const newDate = new Date();
  return time(new Date(year(newDate), month(newDate) - 1, day(newDate)));
};

const validDate = (value, fmt) => {
  const result = {};
  let dt = new Date(value);
  if (isNaN(year(dt)) || time(dt) < min() || time(dt) > max()) {
    result.isValid = false;
    console.log('Invalid Date or Out of Valid Date Range');
    dt = new Date();
  } else {
    result.isValid = true;
  }

  result.year = year(dt);
  result.month = month(dt);
  result.day = day(dt);
  result.time = time(new Date(result.year, result.month - 1, result.day));
  if (fmt) {
    result.value = format(dt, fmt);
  }
  return result;
};

const min = () => (new Date(1900, 0, 1).getTime());

const max = () => (new Date(9999, 11, 31).getTime());

export default {
  format,
  year,
  month,
  day,
  weekday,
  time,
  convertMonth,
  add,
  currentTime,
  validDate,
  'DEFAULT_OUTPUT_FORMAT': 'yyyy-MM-dd',
  RANGE: 'range',
  SINGLE: 'single',
  START: 'start',
  END: 'end',
  min: min(),
  max: max()
};
