import { useReducer } from "react";
import AddTask from "./addTask";
import TaskList from "./taskList";
import { TasksContext, TasksDispatchContext } from "./taskContext";

const initialTasks = [
  { id: 0, text: "Philosopher’s Path", done: true },
  { id: 1, text: "Visit the temple", done: false },
  { id: 2, text: "Drink matcha", done: false },
];

function tasksReducer(tasks: any, action: any) {
  switch (action.type) {
    case "added": {
      return [
        ...tasks,
        {
          id: action.id,
          text: action.text,
          done: false,
        },
      ];
    }
    case "changed": {
      return tasks.map((t: any) => {
        if (t.id === action.task.id) {
          return action.task;
        } else {
          return t;
        }
      });
    }
    case "deleted": {
      return tasks.filter((t: any) => t.id !== action.id);
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}

export default function TaskApp() {
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);

  return (
    <>
      <TasksContext.Provider value={tasks}>
        <TasksDispatchContext.Provider value={dispatch as any}>
          <h1>Day off in Kyoto</h1>
          <AddTask />
          <TaskList />
        </TasksDispatchContext.Provider>
      </TasksContext.Provider>
    </>
  );
}
