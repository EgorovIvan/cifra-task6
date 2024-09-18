import * as React from "react";
import CategoryItem from "./CategoryItem.tsx";
import {Category} from "../pages/TaskManager.tsx";
import FormAdd from "./FormAdd.tsx";
import {v4 as uuid} from 'uuid';
import {useImmer} from "use-immer";

interface Props {
  categories: Category[];
  updateCategories: (p: (draft) => void) => void;
}

const CategoriesList: React.FC<Props> = (Props) => {

  const [showForm, updateShowForm] = useImmer({
    show_form_add_category: false,
  })

  const [category, updateCategory] = useImmer({
    guid: "",
    name: "",
    tasks: [{
      guid: "",
      title: "",
      completed: false
    }]
  })

  /* Получить имя категории */
  const getNameCategory = (name): void => {

    updateCategory((draft): void => {
      draft.name = name
    })

  }

  /* Открыть форму добавления категории/карточки */
  const handleOpenFormAddCategory = (): void => {

    updateShowForm((draft): void => {
      draft.show_form_add_category = true
    })

    /* генерация данных категории */
    updateCategory((draft): void => {
      draft.tasks = [{
        guid: uuid(),
        title: "example",
        completed: false
      }];
    })

  }

  /* Закрыть форму добавления категории/карточки */
  const handleCloseFormAddCategory = (): void => {

    updateShowForm((draft): void => {
      draft.show_form_add_category = false
    })

    updateCategory((draft): void => {
      draft.guid = ''
      draft.name = ''
      draft.tasks = [{
        guid: "",
        title: "",
        completed: false
      }]
    })

  }

  /* Добавить новую категорию */
  const addCategory = (): void => {

    if (category.name) {

      Props.updateCategories((draft): void => {
        draft.push(category)
      })

      localStorage.setItem('categories', JSON.stringify([...Props.categories, category]))
    }

    updateCategory((draft): void => {
      draft.guid = ''
      draft.name = ''
      draft.tasks = [{
        guid: "",
        title: "",
        completed: false
      }]
    })

    updateShowForm((draft): void => {
      draft.show_form_add_category = false
    })

  }

  return (
    <ul className="categories__list">
      {Props.categories.map((category, index) => (
        <CategoryItem
          key={category.name + index}
          index={index}
          category={category}
          categories={Props.categories}
          updateCategories={Props.updateCategories}
        />
      ))}
      {!showForm.show_form_add_category ?
        <li className="categories__list-add" onClick={handleOpenFormAddCategory}>
          <span>+</span>Добавить категорию
        </li> :
        <FormAdd
          classForm="categories__form"
          placeholder="Введите имя категории"
          closeForm={handleCloseFormAddCategory}
          getName={getNameCategory}
          add={addCategory}
        />
      }
    </ul>
  )
}

export default CategoriesList
