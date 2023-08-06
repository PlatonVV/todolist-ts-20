import React, { FC, memo, useEffect } from "react";
import { TodolistDomainType } from "features/todolists-list/todolists/model/todolists.slice";
import { tasksThunks } from "features/todolists-list/tasks/model/tasks.slice";
import { useActions } from "common/hooks";
import { AddItemForm } from "common/components";
import { TaskType } from "features/todolists-list/tasks/api/tasks.api.types";
import { FilterTasksButton } from "features/todolists-list/todolists/ui/todolist/filter-tasks-button/filter-tasks-button";
import { Tasks } from "features/todolists-list/todolists/ui/todolist/tasks/tasks";
import { TodolistTitle } from "features/todolists-list/todolists/ui/todolist/todolist-title/todolist-title";
import s from "./todolist.module.css";

type Props = {
  todolist: TodolistDomainType;
  tasks: TaskType[];
};

export const Todolist: FC<Props> = memo(function ({ todolist, tasks }) {
  const { fetchTasks, addTask } = useActions(tasksThunks);

  useEffect(() => {
    fetchTasks(todolist.id);
  }, []);

  const addTaskCallBack = (title: string) => {
    return addTask({ title, todolistId: todolist.id }).unwrap();
  };

  return (
    <div>
      <h3>
        <TodolistTitle todolist={todolist} />
      </h3>
      <AddItemForm addItem={addTaskCallBack} disabled={todolist.entityStatus === "loading"} />
      <Tasks tasks={tasks} todolist={todolist} />
      <div className={s.filterTasksButton}>
        <FilterTasksButton todolist={todolist} />
      </div>
    </div>
  );
});
