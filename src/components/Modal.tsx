// components/Modal.tsx
import React from 'react';

const Modal = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg w-1/3">
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
