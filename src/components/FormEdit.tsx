import * as React from "react";
import Input from "./Input.tsx";
import Button from "./Button.tsx";
import {useOnClickOutside} from "usehooks-ts";
import {MutableRefObject, useRef} from "react";

interface Props {
  classForm: string;
  placeholder: string;
  closeForm: () => void;
  getName: (name:string) => void;
  add: () => void;
}

const FormEdit: React.FC<Props> = (Props) => {
  const refForm: MutableRefObject<any> = useRef(null)

  /* Закрыть форму при нажатии вне её */
  useOnClickOutside(refForm, Props.closeForm)

  return (
      <form className={Props.classForm} ref={refForm}>
        <Input
          classInp="form-edit__field"
          type="text"
          name="category"
          placeholder={Props.placeholder}
          updateValue={Props.getName}
        />
        <div className="form-edit__wrapper">
          <Button type="button" classBtn="form-edit__btn-open" text="Сохранить" onClickBtn={() => Props.add()}/>
          <Button type="button" classBtn="form-edit__btn-close" text=" " onClickBtn={Props.closeForm}/>
        </div>
      </form>
  )
}

export default FormEdit
