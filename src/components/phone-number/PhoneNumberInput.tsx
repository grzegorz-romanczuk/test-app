import { useState } from "react";
import Select from "react-select";
import { number } from "yargs";
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
    value: value.country,
  }));
  const [prefixValue, setPrefixValue] = useState(
    value
      ? { label: `+${value.number}`, value: value.prefix }
      : prefixesFormated[0]
  );
  const [phoneNumberValue, setPhoneValueNumber] = useState("");
  const onChangeHandler = () => {
    onChange(prefixValue.label, phoneNumberValue);
  };

  const onPrefixChangeHandler = (value) => {
    setPrefixValue(value);
    onChangeHandler();
  };

  const onPhoneNumberChangeHandler = (event) => {
    const value = event.target.value;
    if (/^[0-9]{0,9}$/.test(value)) {
      setPhoneValueNumber(value);
      onChangeHandler();
    }
  };

  return (
    <div className={classes["phone-number-container"]}>
      <Select
        options={prefixesFormated}
        className={classes.prefix}
        value={prefixValue}
        onChange={onPrefixChangeHandler}
      />
      <input
        className={classes["phone-number"]}
        onChange={onPhoneNumberChangeHandler}
        value={phoneNumberValue}
        placeholder="Phone number..."
        type="number"
      />
    </div>
  );
};

export default PhoneNumberInput;
