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
