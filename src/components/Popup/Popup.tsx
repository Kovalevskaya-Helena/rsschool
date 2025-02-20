import { DownloadButton } from '../DownloadButton';
import { Button } from '../Button';
import { useSelector, useDispatch } from 'react-redux';
import {
  unSelectAllItems,
  getSelectedItems,
} from '../../redux/selectedItemsSlice';
import { clsx } from '../../helpers/clsx';

import './popup.css';

export const Popup = () => {
  const dispatch = useDispatch();
  const selectedItems = useSelector(getSelectedItems);

  const selectedItemsAmount = Object.keys(selectedItems).length;

  return (
    <div
      className={clsx(
        'popup-container',
        Boolean(selectedItemsAmount) && 'visible'
      )}
    >
      <div className="popup-label">{`Selected ${selectedItemsAmount} items`}</div>
      <div className="popup-box">
        <Button
          onClick={() => dispatch(unSelectAllItems())}
          className="popup-button"
        >
          Unselect all
        </Button>
        <DownloadButton
          items={selectedItems}
          amountItems={selectedItemsAmount}
        />
      </div>
    </div>
  );
};
