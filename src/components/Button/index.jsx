import React from 'react';
import './button.css';

const Button = (props) => {
  const { primary, size, label } = props;
  const mode = primary ? 'button--primary' : 'button--secondary';

  return (
    <button type="button" className={['button', `button--${size}`, mode].join(' ')} {...props}>
      {label}
    </button>
  );
};

export default Button;
