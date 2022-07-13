import React, { useState } from "react";
import "./App.css";
import PhoneNumberInput from "./components/phone-number/PhoneNumberInput";
import { LetterOnlyInput } from "./LetterOnlyInput";

const prefixes = Object.entries({
  Austria: "43",
  Belgium: "32",
  Bulgaria: "359",
  Croatia: "385",
  Cyprus: "357",
  "Czech Republic": "420",
  Denmark: "45",
  Estonia: "372",
  Finland: "358",
  France: "33",
  Germany: "49",
  Greece: "30",
  Hungary: "36",
  Iceland: "354",
  Italy: "39",
  Latvia: "371",
  Liechtenstein: "423",
  Lithuania: "370",
  Luxembourg: "352",
  Malta: "356",
  Netherlands: "31",
  Norway: "47",
  Poland: "48",
  Portugal: "351",
  "Republic of Ireland": "353",
  Romania: "40",
  Slovakia: "421",
  Slovenia: "386",
  Spain: "34",
  Sweden: "46",
}).map(([country, prefix]) => ({ country, prefix }));

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const buttonHandler = () => {
    setIsOpen(!isOpen);
  };

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");

  const [phone, setPhone] = useState({ number: "", prefix: "" });

  return (
    <React.Fragment>
      <div>
        <LetterOnlyInput
          value={name}
          onChange={(newValue: string) => setName(newValue)}
        />
        <LetterOnlyInput
          value={surname}
          onChange={(newValue: string) => setSurname(newValue)}
        />
        <button onClick={buttonHandler}>{!isOpen ? "Open" : "Close"}</button>
        {isOpen && <p>It's open</p>}
        <PhoneNumberInput
          prefixes={prefixes}
          onChange={(newPhone: { number: string; prefix: string }) =>
            setPhone(newPhone)
          }
          value={phone}
        />
      </div>
      {phone.number !== "" && phone.prefix !== "" && (
        <div>
          <p>{`(+${phone.prefix}) ${phone.number}`}</p>
        </div>
      )}
    </React.Fragment>
  );
}

export default App;
