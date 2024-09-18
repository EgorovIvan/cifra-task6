import * as React from "react";
import TasksList from "./TasksList.tsx";
import {Category} from "../pages/TaskManager.tsx";
import FormAdd from "./FormAdd.tsx";
import Settings from "./Settings.tsx";
import {useImmer} from "use-immer";
import {v4 as uuid} from 'uuid';
import {Draft} from "immer";

interface Props {
  index: number;
  category: Category;
  categories: Category[];
  updateCategories: (p: (draft: Draft<Category[]>) => void) => void;
}

const CategoryItem: React.FC<Props> = (Props) => {

  const [showForm, updateShowForm] = useImmer({
    show_form_add_task: false,
    show_form_remove_category: false
  })

  const [task, updateTask] = useImmer({
      guid: "",
      title: "",
      completed: false
    }
  )

  /* Открыть форму удаления категории/карточки */
  const handleOpenFormRemoveCategory = (): void => {

    updateShowForm((draft): void => {
      draft.show_form_remove_category = true
    })

  }

  /* Закрыть форму удаления категории/карточки */
  const handleCloseFormRemoveCategory = (): void => {

    updateShowForm((draft): void => {
      draft.show_form_remove_category = false
    })

  }

  /* Удалить категорию */
  const removeCategory = (guid: string): void => {

    Props.updateCategories((draft): void => {
      draft.splice(Props.index, 1)
    })

    let localArray = JSON.parse(JSON.stringify(Props.categories)).filter((obj: any) => obj.guid !== guid);

    localStorage.setItem('categories', JSON.stringify([...localArray]))

  }

  /* Открыть форму добавления задачи */
  const handleOpenFormTask = (): void => {

    updateShowForm((draft): void => {
      draft.show_form_add_task = true
    })

  }

  /* Закрыть форму добавления задачи */
  const handleCloseFormTask = (): void => {

    updateShowForm((draft): void => {
      draft.show_form_add_task = false
    })

    updateTask((draft): void => {
      draft.guid = ''
      draft.title = ''
      draft.completed = false
    })

  }

  /* Получить имя категории */
  const getNameTask = (name: string): void => {

    updateTask((draft): void => {
      draft.guid = uuid()
      draft.title = name
    })

  }

  /* Добавить новую задачу */
  const addTask = (): void => {

    if (task.title) {

      Props.updateCategories((draft): void => {
        draft[Props.index].tasks.push(task)
      })

      let localArray = JSON.parse(JSON.stringify(Props.categories))

      localArray.map((obj: any): void => {
        if (obj.guid === Props.category.guid) {
          obj.tasks.push(task)
        }
      });

      localStorage.setItem('categories', JSON.stringify([...localArray]))

    }

    updateTask((draft): void => {
      draft.guid = ''
      draft.title = ''
      draft.completed = false
    })

    updateShowForm((draft): void => {
      draft.show_form_add_task = false
    })

  }

  return (
    <li className="categories__item">
      <div className="categories__item-title">
        <h4>{Props.category.name}</h4>
        <div className="categories__item-wrapper">
          <div className="categories__item-sett" onClick={handleOpenFormRemoveCategory}></div>
          {showForm.show_form_remove_category ?
            <Settings
              closeForm={handleCloseFormRemoveCategory}
              remove={removeCategory}
              guid={Props.category.guid}
            /> :
            ''}
        </div>

      </div>

      <TasksList
        indexCategory={Props.index}
        tasks={Props.category.tasks}
        categories={Props.categories}
        updateCategories={Props.updateCategories}
      />
      {!showForm.show_form_add_task ?
        <div className="categories__item-btn-wrapper">
          <div className="categories__item-btn" onClick={handleOpenFormTask}>
            <span>+</span>Добавить задачу
          </div>
        </div> :
        <FormAdd
          classForm="tasks__form"
          placeholder="Введите имя задачи"
          closeForm={handleCloseFormTask}
          getName={getNameTask}
          add={addTask}
        />
      }
    </li>
  )
}

export default CategoryItem
