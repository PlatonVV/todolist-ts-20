import React, { FC, memo, useCallback, useEffect } from "react";
import { Delete } from "@mui/icons-material";
import { Button, IconButton } from "@mui/material";
import { Task } from "features/todolists-list/tasks/ui/task/task";
import { FilterValuesType, TodolistDomainType } from "features/todolists-list/todolists/model/todolists.reducer";
import { tasksThunks } from "features/todolists-list/tasks/model/tasks.reducer";
import { TaskStatuses } from "common/enums";
import { useActions } from "common/hooks";
import { AddItemForm, EditableSpan } from "common/components";
import { TaskType } from "features/todolists-list/tasks/api/tasks.api.types";

type Props = {
  todolist: TodolistDomainType;
  tasks: TaskType[];
  changeFilter: (value: FilterValuesType, todolistId: string) => void;
  removeTodolist: (id: string) => void;
  changeTodolistTitle: (id: string, newTitle: string) => void;
};

export const Todolist: FC<Props> = memo(function ({
  todolist,
  tasks,
  changeFilter,
  removeTodolist,
  changeTodolistTitle,
}) {
  const { fetchTasks, addTask } = useActions(tasksThunks);

  useEffect(() => {
    fetchTasks(todolist.id);
  }, []);

  const addTaskCallBack = (title: string) => addTask({ title, todolistId: todolist.id });

  const removeTodolistHandler = () => {
    removeTodolist(todolist.id);
  };

  const changeTodolistTitleHandler = useCallback(
    (title: string) => {
      changeTodolistTitle(todolist.id, title);
    },
    [todolist.id, changeTodolistTitle]
  );

  const onAllClickHandler = useCallback(() => changeFilter("all", todolist.id), [todolist.id, changeFilter]);
  const onActiveClickHandler = useCallback(() => changeFilter("active", todolist.id), [todolist.id, changeFilter]);
  const onCompletedClickHandler = useCallback(
    () => changeFilter("completed", todolist.id),
    [todolist.id, changeFilter]
  );

  let tasksForTodolist = tasks;

  if (todolist.filter === "active") {
    tasksForTodolist = tasks.filter((t) => t.status === TaskStatuses.New);
  }
  if (todolist.filter === "completed") {
    tasksForTodolist = tasks.filter((t) => t.status === TaskStatuses.Completed);
  }

  return (
    <div>
      <h3>
        <EditableSpan value={todolist.title} onChange={changeTodolistTitleHandler} />
        <IconButton onClick={removeTodolistHandler} disabled={todolist.entityStatus === "loading"}>
          <Delete />
        </IconButton>
      </h3>
      <AddItemForm addItem={addTaskCallBack} disabled={todolist.entityStatus === "loading"} />
      <div>
        {tasksForTodolist.map((t) => (
          <Task key={t.id} task={t} todolistId={todolist.id} />
        ))}
      </div>
      <div style={{ paddingTop: "10px" }}>
        <Button variant={todolist.filter === "all" ? "outlined" : "text"} onClick={onAllClickHandler} color={"inherit"}>
          All
        </Button>
        <Button
          variant={todolist.filter === "active" ? "outlined" : "text"}
          onClick={onActiveClickHandler}
          color={"primary"}
        >
          Active
        </Button>
        <Button
          variant={todolist.filter === "completed" ? "outlined" : "text"}
          onClick={onCompletedClickHandler}
          color={"secondary"}
        >
          Completed
        </Button>
      </div>
    </div>
  );
});
