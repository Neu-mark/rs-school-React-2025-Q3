import { useDispatch, useSelector } from 'react-redux';
import {
  clearSelectedItems,
  selectSelectedItems,
  selectSelectedItemsCount,
} from '../store/slices/selectedItemsSlice';
import type { AppDispatch } from '../store/store';

export default function Flyout() {
  const dispatch: AppDispatch = useDispatch();
  const selectedCount = useSelector(selectSelectedItemsCount);
  const selectedItems = useSelector(selectSelectedItems);

  const handleUnselectAll = () => {
    dispatch(clearSelectedItems());
  };

  const handleDownload = () => {
    const headers = ['id', 'name', 'description', 'imageUrl'];
    const rows = selectedItems.map((item) => [
      item.id,
      item.name,
      `"${item.description.replace(/"/g, '""')}"`,
      item.imageUrl || '',
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `${selectedCount}_items.csv`);
    document.body.appendChild(link);

    link.click();
    document.body.removeChild(link);
  };

  if (selectedCount === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 w-auto max-w-lg p-4 bg-pokemon-secondary dark:bg-gray-800 dark:border dark:border-pokemon-accent text-white rounded-lg shadow-lg flex items-center justify-between gap-4 z-50 animate-pulse-slow">
      <p className="font-semibold">
        {selectedCount} item{selectedCount > 1 ? 's' : ''} selected
      </p>
      <div className="flex gap-2">
        <button
          onClick={handleUnselectAll}
          className="py-2 px-4 rounded bg-pokemon-accent hover:bg-yellow-600 transition-colors text-white text-sm font-bold"
        >
          Unselect all
        </button>
        <button
          onClick={handleDownload}
          className="py-2 px-4 rounded bg-pokemon-success hover:bg-green-700 transition-colors text-white text-sm font-bold"
        >
          Download
        </button>
      </div>
    </div>
  );
}
