import AddTask from "./addTask";
import TaskList from "./taskList";
import { TasksProvider } from "./taskContext";

export default function TaskApp() {
  return (
    <TasksProvider>
      <h1>Day off in Kyoto</h1>
      <AddTask />
      <TaskList />
    </TasksProvider>
  );
}
