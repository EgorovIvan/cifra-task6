import * as React from "react";

interface Props {
  type: string;
  name: string;
  title: string;
  placeholder: string;
  addClass: string;
  inputValue: string;
  updateValue: (p: (draft: any) => void) => void;
  validateValue: boolean;
  isNull: boolean;
  textError: string;
}
const Input: React.FC<Props> = (Props) => {

  return (
    <div className="input-box">
      <input
        className={'filter__form-field ' + Props.addClass}
        type={Props.type}
        name={Props.name}
        id={Props.name}
        placeholder={Props.placeholder}
        value={Props.inputValue}
        onChange={e => Props.updateValue((draft) => {
          draft.value = e.target.value
        })}
      />
      <label htmlFor={Props.name}>{Props.title}</label>

      {Props.isNull ? <div className="error">Поле ввода не должно быть пустым</div> : ''}

      {Props.validateValue ? <div className="error">{Props.textError}</div> : ''}
    </div>
  )
}

export default Input
