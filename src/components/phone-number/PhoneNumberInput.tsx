import Select, { SingleValue } from "react-select";
import classes from "./PhoneNumberInput.module.css";

type PhoneNumberInputProps = {
  prefixes: { country: string; prefix: string }[];
  value?: { prefix: string; number: string };
  onChange?: Function;
};
type SelectOption = { label: string; value: string };

const PhoneNumberInput = ({
  prefixes,
  value = { prefix: "", number: "" },
  onChange = () => {},
}: PhoneNumberInputProps) => {
  const prefixesFormated: SelectOption[] = prefixes.map((value) => ({
    label: `+${value.prefix} (${value.country})`,
    value: value.prefix,
  }));

  const onPrefixChange = (newPrefix: SingleValue<SelectOption>) => {
    onChange({ number: value.number, prefix: newPrefix?.value });
  };

  const onNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (/^[0-9]{0,9}$/.test(newValue)) {
      onChange({ prefix: value.prefix, number: newValue });
    }
  };
  const selectedOption = prefixesFormated.find(
    (option) => option.value === value.prefix
  );

  return (
    <div className={classes["phone-number-container"]}>
      <Select<SelectOption>
        options={prefixesFormated}
        className={classes.prefix}
        value={selectedOption}
        name="prefixes"
        inputId="prefix"
        onChange={onPrefixChange}
      />
      <input
        className={classes["phone-number"]}
        onChange={onNumberChange}
        value={value.number}
        name="phone"
        placeholder="Phone number..."
        type="text"
      />
    </div>
  );
};

export default PhoneNumberInput;
