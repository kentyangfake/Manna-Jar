export const BibleReference = async (
  book: string,
  chapter: string,
  verse: string
) => {
  try {
    const response = await fetch(
      `https://bible.fhl.net/json/qb.php?chineses=${book}&chap=${chapter}&sec=${verse}`
    );
    const data = await response.json();
    let verses = `${book} ${chapter}:${verse} <br>`;
    data.record.map(
      (sec: { sec: string; bible_text: string }) =>
        (verses += `[${sec.sec}]${sec.bible_text}`)
    );
    return verses;
  } catch (error) {
    return '查無此經節,請參考教學內容';
  }
};

export const parseTime = (timestamp: number) => {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, '0');
  let month: string;
  switch (date.getMonth()) {
    case 0:
      month = 'Jan';
      break;
    case 1:
      month = 'Feb';
      break;
    case 2:
      month = 'Mar';
      break;
    case 3:
      month = 'Apr';
      break;
    case 4:
      month = 'May';
      break;
    case 5:
      month = 'Jun';
      break;
    case 6:
      month = 'Jul';
      break;
    case 7:
      month = 'Aug';
      break;
    case 8:
      month = 'Sep';
      break;
    case 9:
      month = 'Oct';
      break;
    case 10:
      month = 'Nov';
      break;
    case 11:
      month = 'Dec';
      break;
    default:
      month = '';
  }

  return `${day} ${month} ${year}, ${hours}:${minutes}`;
};

export const parseWeekday = (timestamp: number) => {
  const date = new Date(timestamp);
  let weekday: string;
  switch (date.getDay()) {
    case 0:
      weekday = '日';
      break;
    case 1:
      weekday = '一';
      break;
    case 2:
      weekday = '二';
      break;
    case 3:
      weekday = '三';
      break;
    case 4:
      weekday = '四';
      break;
    case 5:
      weekday = '五';
      break;
    case 6:
      weekday = '六';
      break;
    default:
      weekday = '';
  }
  return `${weekday}`;
};
