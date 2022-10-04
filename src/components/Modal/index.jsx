import React from 'react';
import './index.css';

const Modal = (props) => {
  const { header, body } = props;

  return (
    <div className="modal-container">
      <div className="modal-card">
        <div className="modal-header">{header}</div>
        <div className="modal-body">{body}</div>
      </div>
    </div>
  );
};

export default Modal;
