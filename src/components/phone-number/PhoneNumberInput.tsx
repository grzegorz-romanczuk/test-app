import { useState } from "react";
import Select from "react-select";
import classes from "./PhoneNumberInput.module.css";

type PhoneNumberInputProps = {
  prefixes: { country: string; prefix: string }[];
  value?: { prefix: string; number: string };
  onChange?;
};

const PhoneNumberInput = ({
  prefixes,
  value = { prefix: "", number: "" },
  onChange = () => {},
}: PhoneNumberInputProps) => {
  const prefixesFormated = prefixes.map((value) => ({
    label: `+${value.prefix} (${value.country})`,
    value: value.prefix,
  }));

  const onPrefixChange = (newPrefix) => {
    onChange({ number: value.number, prefix: newPrefix.value });
  };

  const onNumberChange = (e) => {
    const newValue = e.target.value;
    if (/^[0-9]{0,9}$/.test(newValue)) {
      onChange({ prefix: value.prefix, number: newValue });
    }
  };

  return (
    <div className={classes["phone-number-container"]}>
      <Select
        // @ts-ignore
        options={prefixesFormated}
        className={classes.prefix}
        value={value.prefix}
        onChange={onPrefixChange}
      />
      <input
        className={classes["phone-number"]}
        onChange={onNumberChange}
        value={value.number}
        placeholder="Phone number..."
        type="number"
      />
    </div>
  );
};

export default PhoneNumberInput;
