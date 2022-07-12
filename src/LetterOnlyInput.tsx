import React from "react";

export const LetterOnlyInput = ({
  value,
  onChange,
}: {
  value: string;
  onChange: Function;
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (/^[A-Za-z]*$/.test(newValue)) onChange(newValue);
  };

  return <input value={value} onChange={handleChange} />;
};
