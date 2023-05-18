import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  decrementFontSize,
  incrementFontSize,
  selectFontSize,
} from '../../redux/userSlice';
import * as styles from '../../utils/styles';
import { parseDisplayFontSize } from '../../utils/utils';

interface Props {
  toggleFontSize: boolean;
  setToggleFontSize: React.Dispatch<React.SetStateAction<boolean>>;
  settoggleHelp: React.Dispatch<React.SetStateAction<boolean>>;
}

const SizePicker = ({
  toggleFontSize,
  setToggleFontSize,
  settoggleHelp,
}: Props) => {
  const dispatch = useAppDispatch();
  const fontSizeNum = useAppSelector(selectFontSize);
  const fontSize = parseDisplayFontSize(fontSizeNum);

  return (
    <div
      className={`lg:w-16 relative ${
        styles.themeFlex
      } transition-all w-20 border-l ${
        toggleFontSize
          ? 'borde-b-0 bg-stone-100 hover:border-b-0'
          : 'border-b-2 hover:border-b-4 hover:border-l-2 bg-stone-300 hover:bg-stone-200'
      }`}
    >
      <span
        className="cursor-pointer grow text-center text-lg font-serif font-bold"
        onClick={() => {
          setToggleFontSize((prev) => !prev);
          settoggleHelp(false);
        }}
      >
        Aa
      </span>
      <div
        className={`lg:-right-[1px] ${toggleFontSize ? 'flex' : 'hidden'} ${
          styles.theme
        } absolute z-30 -right-[1px] top-[30px] h-16 w-[248px] justify-center items-center rounded-b-3xl rounded-tl-3xl drop-shadow-xl border bg-stone-300`}
      >
        <div
          className={`${styles.themeButtonNoBg} grow h-full rounded-l-3xl text-2xl font-serif font-bold`}
          onClick={() => dispatch(decrementFontSize())}
        >
          <span className="material-symbols-outlined">text_decrease</span>
        </div>
        <div
          className={`${styles.theme} flex justify-center items-center w-[87px] border-l h-full font-serif text-2xl font-bold`}
        >
          {fontSize}
        </div>
        <div
          className={`${styles.themeButtonNoBg} grow border-l h-full rounded-br-3xl text-2xl font-serif font-bold`}
          onClick={() => dispatch(incrementFontSize())}
        >
          <span className="material-symbols-outlined">text_increase</span>
        </div>
      </div>
    </div>
  );
};

export default SizePicker;
