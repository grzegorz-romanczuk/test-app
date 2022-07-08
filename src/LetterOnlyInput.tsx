export const LetterOnlyInput = ({ value, onChange }) => {
  const handleChange = (e) => {
    const newValue = e.target.value;
    if (/^[A-Za-z]*$/.test(newValue)) onChange?.(newValue);
  };

  return <input value={value} onChange={handleChange} />;
};
