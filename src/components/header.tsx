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
    <div
      className={`${styles.theme} ${
        underline &&
        'underline underline-offset-4 decoration-wavy decoration-3 decoration-stone-200'
      } flex justify-between items-center text-4xl tracking-[.3em] italic font h-20 px-4`}
    >
      <p>{text}</p>
      {sharedBy && <div className="text-xs">{sharedBy} 分享的</div>}
      <div className="flex flex-col text-xs">
        {createTime && createTime > 1 && (
          <p>
            建立時間:
            {`${parseDate(createTime)}, ${parseTime(createTime)}`}
          </p>
        )}
        {editTime && editTime > 1 && (
          <p>
            {sharedBy ? '收藏時間' : '編輯時間'}:
            {`${parseDate(editTime)}, ${parseTime(editTime)}`}
          </p>
        )}
      </div>
    </div>
  );
};

export default Header;
