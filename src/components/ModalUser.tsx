import Button from "./Button.tsx";
import * as React from "react";
import Input from "./Input.tsx";
import {User} from "../pages/UserManagement.tsx";


interface Props {
  title: string;
  textBtn: string;
  editUserData?: User | undefined;
  getName: (name:string) => void;
  getEmail: (email:string) => void;
  getPhone: (phone:string) => void;
  actionUser: (id:string) => void;
  handleCloseModal: () => void;
}

const ModalUser: React.FC<Props> = (Props) => {

  return (
    <>
      <div className="modal-user" id="modal-user">

        <form className="modal-user__form" action="" id="form">
          <div className="modal-user__close" onClick={Props.handleCloseModal}></div>

          <h3 className="modal-user__title">{Props.title}</h3>

          <Input
            type="text"
            classInp="input-box__field"
            name="user"
            placeholder="Имя пользователя"
            inputValue={Props.editUserData?.name}
            updateValue={Props.getName}
            // validateValue={inputVznNumber.errorField}
            // isNull={inputVznNumber.isNull}
          />

          <Input
            type="text"
            classInp="input-box__field"
            name="email"
            placeholder="Email"
            inputValue={Props.editUserData?.email}
            updateValue={Props.getEmail}
          />

          <Input
            type="text"
            classInp="input-box__field"
            name="phone"
            placeholder="Phone"
            inputValue={Props.editUserData?.phone}
            updateValue={Props.getPhone}
          />

          <Button
            type="button"
            classBtn="modal-user__btn"
            text={Props.textBtn}
            onClickBtn={() => Props.actionUser(Props.editUserData ? Props.editUserData.id : '')}
          />

        </form>
      </div>
    </>
  )
}

export default ModalUser
