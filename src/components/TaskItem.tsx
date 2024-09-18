import * as React from "react";
import {Category, Task} from "../pages/TaskManager.tsx";
import ModalDefault from "./ModalDefault.tsx";
import FormEdit from "./FormEdit.tsx";
import {useState} from "react";
import {Draft} from "immer";

interface Props {
  index: number;
  indexCategory: number;
  task: Task;
  categories: Category[];
  setResize: (b: boolean) => void;
  updateCategories: (p: (draft: Draft<Category[]>) => void) => void;
}

const TaskItem: React.FC<Props> = (Props) => {

  const [showForm, setShowFrom] = useState<boolean>(false)
  const [name, setName] = useState<string>('')

  /* Открыть форму добавления задачи */
  const handleOpenFormTask = (): void => {

    setShowFrom(true)

    const indexLastElem = Props.categories[Props.indexCategory].tasks.length - 1

    if(Props.index === indexLastElem) {
      Props.setResize(true)
    }
  }

  /* Закрыть форму добавления задачи */
  const handleCloseFormTask = (): void => {

    setShowFrom(false)

    Props.setResize(false)
  }

  /* Получить имя задачи */
  const getNameTask = (name: string): void => {

    setName(name)

  }

  /* Редактировать задачу */
  const editTask = (): void => {
    if (name) {

      Props.updateCategories((draft): void => {
        draft[Props.indexCategory].tasks[Props.index].title = name
      })

      let localArray = JSON.parse(JSON.stringify(Props.categories))

      localArray[Props.indexCategory].tasks[Props.index].title = name

      localStorage.setItem('categories', JSON.stringify([...localArray]))

      Props.setResize(false)
    }
  }

  /* Удалить задачу */
  const removeTask = (): void => {

    Props.updateCategories((draft) => {
      draft[Props.indexCategory].tasks.splice(Props.index, 1)
    })

    let localArray = JSON.parse(JSON.stringify(Props.categories))

    localArray[Props.indexCategory].tasks.splice(Props.index, 1)

    localStorage.setItem('categories', JSON.stringify([...localArray]))
  }

  const toggleTaskCompletion = (): void => {
    Props.updateCategories((draft): void => {
      draft[Props.indexCategory].tasks[Props.index].completed = !Props.task.completed
    })

    let localArray = JSON.parse(JSON.stringify(Props.categories))

    localArray[Props.indexCategory].tasks[Props.index].completed = !Props.task.completed

    localStorage.setItem('categories', JSON.stringify([...localArray]))

  }

  return (
    <li className="tasks__item">
      <h5 className="tasks__item-title">{Props.task.title}</h5>
      <div className="tasks__item-wrapper">
        <div className={Props.task.completed ? 'tasks__item-led' : 'tasks__item-led-false'}
             onClick={toggleTaskCompletion}></div>
        <div className="tasks__item-edit" onClick={handleOpenFormTask}></div>
        <div className="tasks__item-remove" onClick={removeTask}></div>
      </div>

      {showForm ?
        <>
          <ModalDefault/>

          <FormEdit
            classForm="tasks__form-edit"
            placeholder="Введите имя задачи"
            closeForm={handleCloseFormTask}
            getName={getNameTask}
            add={editTask}
          />
        </> : ''
      }

    </li>
  )
}

export default TaskItem
