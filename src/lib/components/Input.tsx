import type { ChangeEvent, FC, RefObject } from "react";

export type InputFieldType =
  | "text"
  | "email"
  | "tel"
  | "password"
  | "hidden"
  | "number"
  | "radio"
  | "date"
  | "file";

interface InputProps {
  name: string;
  type: InputFieldType;
  id: string;
  placeholder?: string;
  autoComplete?: string;
  min?: number;
  max?: number;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  accept?: string;
  innerRef?: RefObject<HTMLInputElement>;
  required: boolean;
  errorMessages?: string[];
}

export const Input: FC<InputProps> = ({
  name,
  type,
  id,
  placeholder,
  autoComplete,
  min,
  max,
  accept,
  innerRef,
  required,
  errorMessages,
  onChange,
}) => {
  return (
    <>
      <input
        name={name}
        type={type}
        id={id}
        placeholder={placeholder}
        autoComplete={autoComplete}
        min={min}
        max={max}
        onChange={onChange}
        accept={accept}
        ref={innerRef}
        required={required}
        data-testid={name}
        className="w-full rounded-md placeholder-gray-500 mt-1 py-2 px-3 bg-gray-200 focus-visible:border-black outline-indigo-500"
      />
      {errorMessages && (
        <p className="text-red-600 text-sm mt-1">{errorMessages.join(" ")}</p>
      )}
    </>
  );
};
