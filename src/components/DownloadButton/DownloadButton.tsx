import { Button } from '../Button';
import { convertToCSV } from '../../helpers/convertToCSV';
import { Item } from '../../helpers/types';
import './downloadbutton.css';

interface DownloadButtonState {
  items: Item[];
}

export const DownloadButton = ({ items }: DownloadButtonState) => {
  const downloadCSV = (items: Item[], filename: string) => {
    const csv = convertToCSV(items, ';');
    console.log(csv.length);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleDownload = () => {
    downloadCSV(items, `${items.length}_starwars_people.csv`);
  };

  return (
    <Button onClick={handleDownload} className="download-button">
      Download
    </Button>
  );
};
