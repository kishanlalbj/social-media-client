import React from 'react';
import PropTypes from 'prop-types';
import './button.css';

const Button = (props) => {
  const { primary, size, label, icon } = props;
  const mode = primary ? 'button--primary' : 'button--secondary';

  return (
    <button type="button" className={['button', `button--${size}`, mode].join(' ')} {...props} icon>
      {icon && <>{props.children}</>} {label}
    </button>
  );
};

Button.propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func
};

Button.defaultProps = {
  size: 'medium',
  onClick: undefined
};

export default Button;
