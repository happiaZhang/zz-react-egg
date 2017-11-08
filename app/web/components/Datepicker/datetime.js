const types = {
  YEAR: 'year',
  MONTH: 'month',
  DAY: 'day'
};

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

const isValid = (newDate) => {
  let isValid = true;

  for (const k in newDate) {
    const v = parseInt(newDate[k]);
    if (isNaN(v)) {
      isValid = false;
      break;
    }

    // valid year
    if (k === types.YEAR && (v < 1000 || v > 9999)) {
      isValid = false;
      break;
    }

    // valid month
    if (k === types.MONTH && (v < 1 || v > 12)) {
      isValid = false;
      break;
    }

    // valid day
    if (k === types.DAY && (v < 1 || v > 31)) {
      isValid = false;
      break;
    }
  }

  return isValid;
};

const year = (newDate) => (newDate.getFullYear());

const month = (newDate) => (newDate.getMonth() + 1);

const day = (newDate) => (newDate.getDate());

const weekday = (newDate) => (newDate.getDay() || 7);

const convertMonth = (month) => (TRANSLATOR[month]);

const add = (newDate, days) => {
  newDate.setDate(day(newDate) + days);
};

export default {
  format,
  isValid,
  year,
  month,
  day,
  weekday,
  convertMonth,
  add
};
