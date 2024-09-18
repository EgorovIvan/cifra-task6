import * as React from "react";
import Input from "./Input.tsx";
import Button from "./Button.tsx";

interface Props {
  classForm: string;
  placeholder: string;
  closeForm: () => void;
  getName: (name:string) => void;
  add: () => void;
}

const FormAdd: React.FC<Props> = (Props) => {

  return (
      <form className={Props.classForm}>
        <Input
          classInp="form-add__field"
          type="text"
          name="category"
          placeholder={Props.placeholder}
          updateValue={Props.getName}
        />
        <div className="form-add__wrapper">
          <Button type="button" classBtn="form-add__btn-open" text="Добавить" onClickBtn={() => Props.add()}/>
          <Button type="button" classBtn="form-add__btn-close" text=" " onClickBtn={Props.closeForm}/>
        </div>
      </form>
  )
}

export default FormAdd
