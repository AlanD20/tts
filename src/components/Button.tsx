import { ButtonHTMLAttributes } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  type?: 'submit' | 'button' | 'reset';
  children?: React.ReactNode | JSX.Element;
}

const Button = ({ label, type = 'submit', children, ...attr }: Props) => (
  <button
    {...attr}
    type={type}
    className={`btn btn-primary btn-md capitalize flex gap-2 items-center ${attr.className}`}
  >
    {label ? <span>{label}</span> : children}
  </button>
);

export default Button;
