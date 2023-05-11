import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  changeOrderByRecord,
  changeOrderByTime,
  selectProfile,
} from '../../redux/userSlice';
import * as styles from '../../utils/styles';

const OrderPicker = () => {
  const dispatch = useAppDispatch();
  const profile = useAppSelector(selectProfile);

  return (
    <div className={`flex bg-stone-500 text-sm border-b border-stone-500`}>
      <div
        className={`lg:grow ${styles.themeButton} p-2 border-r w-44 ${
          profile.orderBy.record === 'create'
            ? 'rounded-tl-full'
            : 'rounded-bl-full'
        }`}
        onClick={() => dispatch(changeOrderByRecord())}
      >
        {profile.orderBy.record === 'create' ? '建 立 時 間' : '更 新 時 間'}
      </div>
      <div
        className={`lg:grow ${styles.themeButton} p-2 border-r w-44 ${
          profile.orderBy.time === 'newest'
            ? 'rounded-br-full'
            : 'rounded-tr-full'
        }`}
        onClick={() => dispatch(changeOrderByTime())}
      >
        {profile.orderBy.time === 'newest' ? '新 到 舊' : '舊 到 新'}
      </div>
      <div className="lg:hidden grow rounded-bl-full bg-stone-300"></div>
    </div>
  );
};

export default OrderPicker;
