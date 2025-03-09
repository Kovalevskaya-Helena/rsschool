import { DownloadButton } from '../DownloadButton';
import { Button } from '../Button';
import { useSelector, useDispatch } from 'react-redux';
import {
  unSelectAllItems,
  getSelectedItems,
} from '../../redux/selectedItemsSlice';
import { clsx } from '../../helpers/clsx';

import styles from './popup.module.css';

export const Popup = () => {
  const dispatch = useDispatch();
  const selectedItems = useSelector(getSelectedItems);

  const selectedItemsAmount = Object.keys(selectedItems).length;

  return (
    <div
      className={clsx(
        styles.popupContainer,
        Boolean(selectedItemsAmount) && styles.visible
      )}
    >
      <div
        className={styles.popupLabel}
      >{`Selected ${selectedItemsAmount} items`}</div>
      <div className={styles.popupBox}>
        <Button
          onClick={() => dispatch(unSelectAllItems())}
          className={styles.popupButton}
        >
          Unselect all
        </Button>
        <DownloadButton items={Object.values(selectedItems)} />
      </div>
    </div>
  );
};
