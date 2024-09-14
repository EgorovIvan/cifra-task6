import * as React from "react";
import UserItem from "./UserItem.tsx";

interface User {
  id: string;
  name: string;
  email: string;
}

interface Props {
  users?: User[]
}

const UsersList: React.FC<Props> = ({users}: Props) => {

  // @ts-ignore
  return (
    <>
      {users ? users.map((item) => {
        <UserItem key={item?.id} item={item}/>
      }) : ''}
    </>
  )
}

export default UsersList
