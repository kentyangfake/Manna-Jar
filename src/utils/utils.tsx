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
    console.error(error);
  }
};

export const parseTime = (timestamp: number) => {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
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

export const parseWeek = (timestamp: number) => {
  const date = new Date(timestamp);
  let week: string;
  switch (date.getDay()) {
    case 0:
      week = '日';
      break;
    case 1:
      week = '一';
      break;
    case 2:
      week = '二';
      break;
    case 3:
      week = '三';
      break;
    case 4:
      week = '四';
      break;
    case 5:
      week = '五';
      break;
    case 6:
      week = '六';
      break;
    default:
      week = '';
  }
  return `${week}`;
};
