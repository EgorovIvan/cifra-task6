import Header from "../components/Header.tsx";
import Footer from "../components/Footer.tsx";
import {useImmer} from "use-immer";
import UserForm from "../components/UserForm.tsx";
// import {v4 as uuidv4} from 'uuid';
import {useState} from "react";
import UsersList from "../components/UsersList.tsx";

// import {Link} from "react-router-dom";

const initialUsersList = [
    { id: '0', name: 'Bellies', email: 'gmail@gmail.com' },
    { id: '1', name: 'Lunar', email: 'gmail@gmail.com' },
    { id: '2', name: 'Terraco', email: 'gmail@gmail.com' },
];

interface User {
    id: string;
    name: string;
    email: string;
}

interface Action {
    open_form: boolean
}

const UserManagement: React.FC = () => {

    // @ts-ignore
    const [users, setUsers] = useState<User[]>([initialUsersList])
    const [openForm, updateOpenForm] = useImmer<Action>({open_form: false})

    /* Открыть форму добавления пользователя */
    const openFormAddUser = (): void => {
        updateOpenForm((draft) => {
            draft.open_form = true
        })
    }

    const handleCloseForm = (): void => {
        updateOpenForm((draft) => {
            draft.open_form = false
        })
    }
    const addUser = (user: User): void => {
        // updateUsers((draft) => {
        //     draft.users.push(user)
        // })

        setUsers((prevUsers: any) => [
            ...prevUsers,
            user,
        ])

        updateOpenForm((draft) => {
            draft.open_form = false
        })
    }

    // const editUser = (): void => {
    //
    // }
    //
    // const removeUser = (): void => {
    //
    // }

    return (
        <>
            <Header/>
            <main className="main">
                <div className="main__btn-add-user" onClick={openFormAddUser}>Создать нового пользователя</div>
                {openForm ? <UserForm addUser={addUser} handleCloseForm={handleCloseForm}/> : ''}
                <UsersList users={users}/>
            </main>
            <Footer/>
        </>
    )
}

export default UserManagement
