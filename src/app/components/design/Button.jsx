import React from 'react';
import clsx from 'clsx';

const Button = ({ variant = 'primary', disabled = false, icon, children }) => {
  const baseStyles = 'px-4 py-2 rounded-md font-medium focus:outline-none';

  const variants = {
    primary: 'bg-accent-primary text-white hover:bg-accent-primary_hover',
    secondary: 'bg-panel-secondary text-text-primary border border-border hover:bg-[#313131]',
    ghost: 'bg-transparent text-text-secondary hover:bg-panel-primary',
  };

  const disabledStyles = 'opacity-50 cursor-not-allowed';

  const classes = clsx(
    baseStyles,
    variants[variant],
    disabled && disabledStyles
  );

  return (
    <button className={classes} disabled={disabled}>
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;