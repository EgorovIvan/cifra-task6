import * as React from "react";

interface Props {
    item: {
        id: string;
        name: string;
        email: string;
    }
}

const UsersList: React.FC<Props> = ({item}: Props) => {


    return (
        <>
            <li className="list-vzn__block-item">
                <h2>{item.id}</h2>
                <p><span>Имя пользователя</span>{item.name}</p>
                <p><span>Email:</span>{item.email}</p>
            </li>
        </>
    )
}

export default UsersList
