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
      className={`lg:flex-col lg:items-start lg:justify-center lg:min-h-12 lg:p-2 lg:pl-5 ${styles.theme} flex justify-between items-end min-h-20 p-5 border-b`}
    >
      <p
        className={`lg:text-2xl ${
          underline && styles.underline
        } decoration-stone-200 text-4xl tracking-[.3em] italic`}
      >
        {text}
      </p>
      {sharedBy && (
        <div className="lg:text-xs lg:mt-2 lg:ml-0 ml-4 mr-auto text-sm font-extralight text-stone-800">{`作者-${sharedBy}`}</div>
      )}
      <div className="lg:text-xs lg:mt-2 flex flex-col text-sm font-extralight text-stone-800">
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
