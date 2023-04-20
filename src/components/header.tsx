import * as styles from '../utils/styles';
import { parseDate, parseTime } from '../utils/utils';

interface Props {
  text: string;
  underline?: boolean;
  createTime?: number;
  editTime?: number;
  sharedBy?: string;
}

const Header = ({ text, underline, createTime, editTime, sharedBy }: Props) => {
  return (
    <div className={`${styles.theme} flex justify-between items-end h-20 p-5`}>
      <p
        className={`${
          underline &&
          'underline underline-offset-4 decoration-wavy decoration-3 decoration-stone-200'
        } text-4xl tracking-[.3em] italic`}
      >
        {text}
      </p>
      {sharedBy && (
        <div className="ml-4 mr-auto text-sm">{`作者-${sharedBy}`}</div>
      )}
      <div className="flex flex-col text-sm">
        {createTime && createTime > 1 && (
          <p>
            建立於/
            {` ${parseDate(createTime)}, ${parseTime(createTime)}`}
          </p>
        )}
        {editTime && editTime > 1 && (
          <p>
            {sharedBy ? '收藏於/' : '編輯於/'}
            {` ${parseDate(editTime)}, ${parseTime(editTime)}`}
          </p>
        )}
      </div>
    </div>
  );
};

export default Header;
