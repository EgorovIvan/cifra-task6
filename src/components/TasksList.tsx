import * as React from "react";
import TaskItem from "./TaskItem.tsx";
import {Category, Task} from "../pages/TaskManager.tsx";
import {useState} from "react";
import {Draft} from "immer";

interface Props {
  indexCategory: number;
  tasks: Task[];
  categories: Category[];
  updateCategories: (p: (draft: Draft<Category[]>) => void) => void;
}

const TasksList: React.FC<Props> = (Props) => {

  const [resizeBlock, setResizeBlock] = useState<boolean>(false)

  return (
      <ul className="tasks__list">
        {Props.tasks.map((task, index) => (
          <TaskItem
            key={task.title + index}
            index={index}
            indexCategory={Props.indexCategory}
            task={task}
            categories={Props.categories}
            setResize={setResizeBlock}
            updateCategories={Props.updateCategories}
          />
        ))}
        {resizeBlock ? <div className="tasks__list-resize"></div> : ''}
      </ul>
  )
}

export default TasksList
