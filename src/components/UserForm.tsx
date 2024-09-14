// import Input from "./Input.tsx";
import Button from "./Button.tsx";
import {useEffect} from "react";
import * as React from "react";
import {useImmer} from "use-immer";


interface User {
  id: string;
  name: string;
  email: string;
}

interface Props {
  addUser: (user: User) => void;
  handleCloseForm: () => void;
}

const UserForm: React.FC<Props> = ({addUser, handleCloseForm}: Props) => {

  const [userData, updateUserData] = useImmer<User>({email: "", id: "", name: ""});



  useEffect(() => {
    updateUserData((draft: { id: string; name: string; email: string; }) => {
      draft.id = "dd"
      draft.name = "dd"
      draft.email = "dd"
    })

  }, []);


  return (
    <>
      <div className="modal" id="filter">
        <main className="filter">

          <form className="filter__form" action="" id="form">

            <div className="filter__form-btns">
              <Button
                type="button"
                classBtn="filter__form-search"
                text="Добавить"
                onClickBtn={() => addUser(userData)}
              />

              <Button
                type="button"
                classBtn="filter__form-cancel"
                text="Отмена"
                onClickBtn={handleCloseForm}
              />

            </div>
          </form>
        </main>
      </div>
    </>
  )
}

export default UserForm
