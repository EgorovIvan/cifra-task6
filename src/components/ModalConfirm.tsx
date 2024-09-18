import Button from "./Button.tsx";
import * as React from "react";
import {User} from "../pages/UserManagement.tsx";


interface Props {
  removeUserData: User;
  actionRemove: (id:string) => void;
  handleCloseModal: () => void;
}

const ModalConfirm: React.FC<Props> = (Props) => {

  return (
    <>
      <div className="modal-confirm" id="modal-confirm">
        <div className="modal-confirm__form">
          <div className="modal-confirm__close" onClick={Props.handleCloseModal}></div>
          <h3 className="modal-confirm__form-title">Подтвердить удаление</h3>
          <Button
            type="button"
            classBtn="modal-confirm__form-btn"
            text="OK"
            onClickBtn={() => Props.actionRemove(Props.removeUserData.id)}
          />
        </div>
      </div>
    </>
  )
}

export default ModalConfirm
