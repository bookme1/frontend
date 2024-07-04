'use client';

import { useEffect } from 'react';

export default function ModalDelete({
  isVisible,
  onClose,
}: {
  isVisible: boolean;
  onClose: any;
}) {
  const handleClose = (e: any) => {
    if (e.target.id === 'wrapper') onClose();
  };

  const handleKeyDown = (e: any) => {
    if (e.key === 'Escape') onClose();
  };
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center"
      id="wrapper"
      onClick={handleClose}
    >
      <div className="w-[500px] ">
        <div className="bg-white p-2 rounded-xl text-green-900 flex flex-col justify-center items-center pt-5">
          <div className="">
            <h1 className="text-green-600 font-bold">
              Ви впевнені що бажаєте видалити книгу:
            </h1>
            <div className="pt-2">
              <p className="flex justify-center">Назва книги</p>
            </div>
            <div className="pt-2">
              <p className="font-bold flex justify-center">Артикул</p>
            </div>
          </div>
          <div className="flex gap-10 pt-5 pb-5 justify-center">
            <button className="border p-3 rounded-lg w-36 text-red-600 hover:bg-gray-300">
              Видалити
            </button>
            <button
              className="border p-3 rounded-lg w-36 hover:bg-green-900 hover:text-white"
              onClick={() => onClose()}
            >
              Відміна
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
