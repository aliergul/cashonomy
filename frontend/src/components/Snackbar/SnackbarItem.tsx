import React, { useCallback, useEffect } from "react";
import { Snackbar } from "../../types/Snackbar";

interface SnackbarItemProps {
  options: Snackbar;
  onClose: (id: string) => void;
}

const SnackbarItem: React.FC<SnackbarItemProps> = ({ options, onClose }) => {
  const handleClose = useCallback(() => {
    onClose(options.id);
  }, [onClose, options.id]);

  useEffect(() => {
    const timerid = window.setTimeout(() => handleClose(), options.duration);
    return () => {
      window.clearTimeout(timerid);
    };
  }, [handleClose, options.duration]);

  return (
    <div
      className="bg-black bg-opacity-80 border border-black text-white px-4 py-3 my-4 pr-10 rounded relative"
      role="alert"
    >
      <span className="block sm:inline">{options.text}</span>
      <button
        className="absolute top-0 bottom-0 right-0 px-4 py-3"
        onClick={handleClose}
      >
        <svg
          className="fill-current h-6 w-6 text-gray-500"
          role="button"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <title>Close</title>
          <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
        </svg>
      </button>
    </div>
  );
};

export default SnackbarItem;
