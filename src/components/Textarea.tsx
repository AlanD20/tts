import { TextareaHTMLAttributes } from 'react';

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  name: string;
  className?: string;
}

const TextInput = ({ label, name, className, ...attr }: Props) => (
  <div className="input-container mb-2 [&+.input-container]:mb-4">
    <label htmlFor={name} className="label capitalize">
      {label}
    </label>
    <textarea
      {...attr}
      name={name}
      className={`textarea textarea-bordered border-2 border-solid input-md w-full text-base focus:outline-none focus:border-gray-500 ${className}`}
    ></textarea>
  </div>
);

export default TextInput;
