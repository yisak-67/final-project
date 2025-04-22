import React from "react";
type Props = {
  children: React.ReactNode;
  onClose: () => void;
};
const Dialog = ({ onClose, children }: Props) => {
  const handleClose = (e: any) => {
    if (e.target.id == "wrapper") onClose();
  };
  return (
    <div
      className="fixed z-10 inset-0 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
      id="wrapper"
      onClick={handleClose}
    >
      <div className="flex items-end justify-center w-full min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
        ></div>
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>
        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle  sm:w-lg sm:w-full md:w-1/2 sm:p-6">
          <div className="sm:flex sm:items-start">
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
              {children}
            </div>
            <button
              onClick={onClose}
              className="ml-auto bg-transparent border-0 text-gray-700 hover:text-gray-500 outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#f00"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dialog;
