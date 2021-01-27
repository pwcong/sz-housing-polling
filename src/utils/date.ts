import dayjs, { Dayjs } from 'dayjs';

function getDay4CN(date) {
  return (date.day() + 6) % 7;
}

export function getWeeksOfYear(year: number) {
  // 计算一年的第一天
  const firstDay = dayjs(new Date(year, 0, 1)).startOf('y');

  // 计算星期几，0（周一） ～ 6（周日）
  const day = getDay4CN(firstDay);

  // 计算一年的第一周的第一天
  let firstWeekDay;
  if (day > 3) {
    firstWeekDay = firstDay.add(7 - day, 'd');
  } else {
    firstWeekDay = firstDay.subtract(day, 'd');
  }

  const weeks = [];
  let t = firstWeekDay.clone();
  while (t.year() <= year) {
    const start = t.clone();
    const end = t.add(6, 'd');

    if (end.year() > year && end.date() >= 4) {
      // 跨年部分，哪一年天个数多就属于哪一年
    } else {
      weeks.push({
        start,
        end,
      });
    }

    t = t.add(7, 'd');
  }

  return weeks;
}

export function getWeekInYear(date: Dayjs) {
  let year = date.year();
  const _year = date.subtract(6, 'd').year();

  if (_year !== year && getDay4CN(date) > 3) {
    year = _year;
  }

  const weeks = getWeeksOfYear(year);

  let currentWeek = weeks.findIndex(
    (d) =>
      date.valueOf() >= d.start.valueOf() && date.valueOf() <= d.end.valueOf()
  );
  if (currentWeek <= -1) {
    currentWeek = 0;
  }

  return currentWeek;
}

export function getNextWeek(year: number, week: number) {
  let nextWeek;

  const weeks = getWeeksOfYear(year);

  if (week + 1 > weeks.length - 1) {
    nextWeek = getWeeksOfYear(year + 1)[0];
  } else {
    nextWeek = weeks[week + 1];
  }

  return nextWeek;
}
