import React, { FC, memo, useCallback, useEffect } from "react";
import { TodolistDomainType } from "features/todolists-list/todolists/model/todolists.reducer";
import { tasksThunks } from "features/todolists-list/tasks/model/tasks.reducer";
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

  const addTaskCallBack = useCallback((title: string) => addTask({ title, todolistId: todolist.id }), []);

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
