export const getBibleReference = async (
  book: string,
  chapter: string,
  verse: string
) => {
  try {
    console.log(book);
    const bookRef = getBookRef(book);
    const response = await fetch(
      `https://bible.fhl.net/json/qb.php?chineses=${bookRef}&chap=${chapter}&sec=${verse}`
    );
    const data = await response.json();
    let verses = `${book} ${chapter}:${verse} <br>`;
    data.record.map(
      (sec: { sec: string; bible_text: string }) =>
        (verses += `[${sec.sec}]${sec.bible_text}`)
    );
    return verses;
  } catch (error) {}
};

export const getBookRef = (book: string) => {
  let bookRef = book;
  switch (book) {
    case '創世紀':
    case '創世':
      bookRef = '創';
      break;
    case '出埃及記':
    case '出埃及':
      bookRef = '出';
      break;
    case '利未記':
    case '利未':
      bookRef = '利';
      break;
    case '民數記':
    case '民數':
      bookRef = '民';
      break;
    case '申命記':
    case '申命':
      bookRef = '申';
      break;
    case '約書亞記':
    case '約書亞':
      bookRef = '書';
      break;
    case '士師記':
    case '士師':
      bookRef = '師';
      break;
    case '路得記':
    case '路得':
      bookRef = '得';
      break;
    case '撒母耳記上':
    case '撒母耳上':
      bookRef = '撒上';
      break;
    case '撒母耳記下':
    case '撒母耳下':
      bookRef = '撒下';
      break;
    case '列王紀上':
    case '列王上':
      bookRef = '王上';
      break;
    case '列王紀下':
    case '列王下':
      bookRef = '王下';
      break;
    case '歷代志上':
    case '歷代上':
      bookRef = '代上';
      break;
    case '歷代志下':
    case '歷代下':
      bookRef = '代下';
      break;
    case '以斯拉記':
    case '以斯拉':
      bookRef = '拉';
      break;
    case '尼希米記':
    case '尼希米':
      bookRef = '尼';
      break;
    case '以斯帖記':
    case '以斯帖':
      bookRef = '斯';
      break;
    case '約伯記':
    case '約伯':
      bookRef = '伯';
      break;
    case '詩篇':
      bookRef = '詩';
      break;
    case '箴言':
      bookRef = '箴';
      break;
    case '傳道書':
      bookRef = '傳';
      break;
    case '雅歌':
      bookRef = '歌';
      break;
    case '以賽亞書':
    case '以賽亞':
      bookRef = '賽';
      break;
    case '耶利米書':
    case '耶利米':
      bookRef = '耶';
      break;
    case '耶利米哀歌':
    case '耶哀':
      bookRef = '哀';
      break;
    case '以西結書':
    case '以西結':
      bookRef = '結';
      break;
    case '但以理書':
    case '但以理':
      bookRef = '但';
      break;
    case '何西阿書':
    case '何西阿':
      bookRef = '何';
      break;
    case '約珥書':
    case '約珥':
      bookRef = '珥';
      break;
    case '阿摩司書':
    case '阿摩司':
      bookRef = '摩';
      break;
    case '俄巴底亞書':
    case '俄巴底亞':
      bookRef = '俄';
      break;
    case '約拿書':
    case '約拿':
      bookRef = '拿';
      break;
    case '彌迦書':
    case '彌迦':
      bookRef = '彌';
      break;
    case '那鴻書':
    case '那鴻':
      bookRef = '鴻';
      break;
    case '哈巴谷書':
    case '哈巴谷':
      bookRef = '哈';
      break;
    case '西番雅書':
    case '西番雅':
      bookRef = '番';
      break;
    case '哈該書':
    case '哈該':
      bookRef = '該';
      break;
    case '撒迦利亞書':
    case '撒迦利亞':
      bookRef = '亞';
      break;
    case '瑪拉基書':
    case '瑪拉基':
      bookRef = '瑪';
      break;
    case '馬太福音':
    case '馬太':
      bookRef = '太';
      break;
    case '馬可福音':
    case '馬可':
      bookRef = '可';
      break;
    case '路加福音':
    case '路加':
      bookRef = '路';
      break;
    case '約翰福音':
    case '約翰':
      bookRef = '約';
      break;
    case '使徒行傳':
    case '使徒':
      bookRef = '徒';
      break;
    case '羅馬書':
    case '羅馬':
      bookRef = '羅';
      break;
    case '哥林多前書':
    case '哥林多前':
      bookRef = '林前';
      break;
    case '哥林多後書':
    case '哥林多後':
      bookRef = '林後';
      break;
    case '加拉太書':
    case '加拉太':
      bookRef = '加';
      break;
    case '以弗所書':
    case '以弗所':
      bookRef = '弗';
      break;
    case '腓立比書':
    case '腓立比':
      bookRef = '腓';
      break;
    case '歌羅西書':
    case '歌羅西':
      bookRef = '西';
      break;
    case '帖撒羅尼迦前書':
    case '帖撒羅尼迦前':
      bookRef = '帖前';
      break;
    case '帖撒羅尼迦後書':
    case '帖撒羅尼迦後':
      bookRef = '帖後';
      break;
    case '提摩太前書':
    case '提摩太前':
      bookRef = '提前';
      break;
    case '提摩太後書':
    case '提摩太後':
      bookRef = '提後';
      break;
    case '提多書':
    case '提多':
      bookRef = '多';
      break;
    case '腓利門書':
    case '腓利門':
      bookRef = '門';
      break;
    case '希伯來書':
    case '希伯來':
      bookRef = '來';
      break;
    case '雅各書':
    case '雅各':
      bookRef = '雅';
      break;
    case '彼得前書':
    case '彼得前':
      bookRef = '彼前';
      break;
    case '彼得後書':
    case '彼得後':
      bookRef = '彼後';
      break;
    case '約壹':
    case '約翰壹書':
    case '約翰壹':
    case '約翰一書':
    case '約翰一':
      bookRef = '約一';
      break;
    case '約貳':
    case '約翰貳書':
    case '約翰貳':
    case '約翰二書':
    case '約翰二':
      bookRef = '約二';
      break;
    case '約叁':
    case '約翰叁書':
    case '約翰叁':
    case '約翰三書':
    case '約翰三':
      bookRef = '約三';
      break;
    case '猶大書':
    case '猶大':
      bookRef = '猶';
      break;
    case '啟示錄':
    case '啟示':
      bookRef = '啟';
      break;
    default:
      bookRef = book;
  }

  return bookRef;
};

export const parseDate = (timestamp: number) => {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const day = date.getDate();
  const months: Record<number, string> = {
    0: '一月',
    1: '二月',
    2: '三月',
    3: '四月',
    4: '五月',
    5: '六月',
    6: '七月',
    7: '八月',
    8: '九月',
    9: '十月',
    10: '十一',
    11: '十二',
  };

  const month = months[date.getMonth()];

  return `${day} ${month} ${year}`;
};

export const parseTime = (timestamp: number) => {
  const date = new Date(timestamp);
  const hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${hours}:${minutes}`;
};

export const parseWeekday = (timestamp: number) => {
  const date = new Date(timestamp);

  const weekdays: Record<number, string> = {
    0: '日',
    1: '一',
    2: '二',
    3: '三',
    4: '四',
    5: '五',
    6: '六',
  };

  const weekday = weekdays[date.getDay()] || '';

  return weekday;
};

export const parseFontSize = (fontSizeNum: number) => {
  const root = document.documentElement;
  let fontSize: string = 'text-xl';
  root.style.setProperty('--h1', `30px`);
  root.style.setProperty('--h2', `26px`);
  root.style.setProperty('--h3', `22px`);
  switch (fontSizeNum) {
    case 1:
      fontSize = 'text-xs';
      root.style.setProperty('--h1', `16px`);
      root.style.setProperty('--h2', `14px`);
      root.style.setProperty('--h3', `12px`);
      break;
    case 2:
      fontSize = 'text-sm';
      root.style.setProperty('--h1', `18px`);
      root.style.setProperty('--h2', `16px`);
      root.style.setProperty('--h3', `14px`);
      break;
    case 3:
      fontSize = 'text-base';
      root.style.setProperty('--h1', `20px`);
      root.style.setProperty('--h2', `18px`);
      root.style.setProperty('--h3', `16px`);
      break;
    case 4:
      fontSize = 'text-lg';
      root.style.setProperty('--h1', `24px`);
      root.style.setProperty('--h2', `22px`);
      root.style.setProperty('--h3', `20px`);
      break;
    case 5:
      fontSize = 'text-xl';
      root.style.setProperty('--h1', `30px`);
      root.style.setProperty('--h2', `26px`);
      root.style.setProperty('--h3', `22px`);
      break;
    case 6:
      fontSize = 'text-2xl';
      root.style.setProperty('--h1', `36px`);
      root.style.setProperty('--h2', `32px`);
      root.style.setProperty('--h3', `28px`);
      break;
    case 7:
      fontSize = 'text-3xl';
      root.style.setProperty('--h1', `42px`);
      root.style.setProperty('--h2', `37px`);
      root.style.setProperty('--h3', `32px`);
      break;
    case 8:
      fontSize = 'text-4xl';
      root.style.setProperty('--h1', `48px`);
      root.style.setProperty('--h2', `43px`);
      root.style.setProperty('--h3', `38px`);
      break;
    case 9:
      fontSize = 'text-5xl';
      root.style.setProperty('--h1', `54px`);
      root.style.setProperty('--h2', `51px`);
      root.style.setProperty('--h3', `48px`);
      break;
    case 10:
      fontSize = 'text-6xl';
      root.style.setProperty('--h1', `64px`);
      root.style.setProperty('--h2', `62px`);
      root.style.setProperty('--h3', `60px`);
      break;
    default:
      fontSize = 'text-xl';
      root.style.setProperty('--h1', `30px`);
      root.style.setProperty('--h2', `26px`);
      root.style.setProperty('--h3', `22px`);
  }

  return fontSize;
};

export const parseHelperFontSize = (fontSizeNum: number) => {
  const fontSizes: Record<number, string> = {
    1: 'text-xs',
    2: 'text-sm',
    3: 'text-base',
    4: 'text-lg',
    5: 'text-xl',
    6: 'text-2xl',
    7: 'text-2xl',
    8: 'text-3xl',
    9: 'text-3xl',
    10: 'text-3xl',
  };

  const fontSize = fontSizes[fontSizeNum] || 'text-xl';

  return fontSize;
};

export const parseDisplayFontSize = (fontSizeNum: number) => {
  const fontSizes: Record<number, string> = {
    1: '10%',
    2: '20%',
    3: '30%',
    4: '40%',
    5: '50%',
    6: '60%',
    7: '70%',
    8: '80%',
    9: '90%',
    10: '100%',
  };

  const fontSize = fontSizes[fontSizeNum] || '50%';

  return fontSize;
};

export const parseGraphFontSize = (fontSizeNum: number) => {
  const fontSizes: Record<number, number> = {
    1: 10,
    2: 11,
    3: 12,
    4: 13,
    5: 14,
    6: 17,
    7: 19,
    8: 21,
    9: 23,
    10: 25,
  };

  const fontSize = fontSizes[fontSizeNum] || 14;

  return fontSize;
};
