import * as React from "react";

interface Props {
  type: string;
  classInp: string;
  name: string;
  placeholder: string;
  inputValue?: string;
  updateValue: (name:string) => void;
}
const Input: React.FC<Props> = (Props) => {

  return (
    <div className="input-box">
      <input
        type={Props.type}
        className={Props.classInp}
        name={Props.name}
        id={Props.name}
        placeholder={Props.placeholder}
        defaultValue={Props.inputValue}
        onChange={e => Props.updateValue(e.target.value)}
      />


      {/*{Props.isNull ? <div className="error">Поле ввода не должно быть пустым</div> : ''}*/}

      {/*{Props.validateValue ? <div className="error">{Props.textError}</div> : ''}*/}
    </div>
  )
}

export default Input
