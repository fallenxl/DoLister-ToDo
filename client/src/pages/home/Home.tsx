import { useEffect, useState } from "react";
import { ComplexNavbar } from "../../components/navbar/Navbar";
import { Task } from "../../interfaces";
import { getAllTasks, toggleTaskCompleted } from "../../services/task.services";
import { Checkbox } from "@material-tailwind/react";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { ModalCreateTask } from "./ModalCreateTask";

const Home = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [selectedTask, setSelectedTask] = useState<string[]>([]);

    useEffect(() => {
        getAllTasks().then((tasks) => {
            setTasks(tasks);
        });
    }, [])

    const handleSelectedTask = (id: string) => {
        if (isTaskSelected(id)) {
            setSelectedTask(selectedTask.filter((taskId) => taskId !== id));
        }
        else {
            setSelectedTask([...selectedTask, id]);
        }
    };

    const isTaskSelected = (id: string) => {
        return selectedTask.includes(id);
    };

    const handleToggleTask = (id: string) => {
        toggleTaskCompleted(id).then((_task) => {
            setTasks(tasks.map((task) => task.task_id === id ? { ...task, completed: !task.completed } : task));
        });
    };

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);

    return (
        <div className="bg-gray-50 w-full min-h-screen p-4">
            <ModalCreateTask setTasks={setTasks} open={open} handler={handleOpen} />
            <ComplexNavbar />
            <main className="flex justify-center mt-10 ">
                <div className="w-[70rem]">
                    <section >
                        <div className="flex justify-between w-full border-b p-4 ">
                            <div className="flex flex-col justify-center ">
                                <h1 className="text-3xl font-bold">To Do</h1>
                                <p className="text-sm">Tasks to do</p>
                            </div>
                            <div className="flex items-center">
                                {/* add task*/}
                                <button onClick={handleOpen} className="bg-gray-500 hover:bg-green-400 text-white px-4 py-2 rounded-md mr-2 flex items-center gap-2">
                                    <PlusIcon className="h-6 w-6" />
                                    Add task
                                </button>
                                {selectedTask.length > 0 && <button className="bg-gray-500 hover:bg-red-400 text-white px-4 py-2 rounded-md mr-2 flex items-center gap-2">
                                    <TrashIcon className="h-6 w-6" />
                                    {`Delete ${selectedTask.length} tasks`}
                                </button>}
                            </div>
                        </div>
                        {/* render tasks */}
                        <ul className="w-full mt-4 p-4">
                            {tasks.length > 0 && tasks.filter((task) => !task.completed).map((task) => {
                                return (
                                    <li className={`flex items-center w-full shadow-md py-4 px-2 mb-4 ${isTaskSelected(task.task_id) ? "bg-gray-200 opacity-40" : "bg-white"} duration-300 rounded-md `} key={task.task_id}>
                                        <div className="border-r border-gray-300 p-2">
                                            <Checkbox
                                                crossOrigin={undefined}
                                                onClick={() => handleToggleTask(task.task_id)}
                                                defaultChecked={task.completed}
                                                ripple={false}
                                                className="h-8 w-8 rounded-full border border-gray-900/20 bg-gray-900/10 transition-all hover:scale-105 hover:before:opacity-0"
                                            />
                                        </div>
                                        <div onClick={() => handleSelectedTask(task.task_id)} className="flex flex-col justify-center px-5 cursor-pointer flex-grow">
                                            <h1 className="text-xl md:text-2xl font-bold mb-2">{task.title}</h1>
                                            <small className="text-xs text-gray-600 ">Description</small>
                                            <p className="text-sm">{task.description}</p>
                                        </div>
                                        <div className="p-4 border-l">
                                            <TrashIcon className="h-6 w-6 text-red-500 cursor-pointer" />
                                        </div>

                                    </li>
                                )
                            })}
                        </ul>
                    </section>

                    {tasks.filter(task => task.completed).length > 0 && <section >
                        <div className="flex justify-between w-full border-b p-4 ">
                            <div className="flex flex-col justify-center ">
                                <h1 className="text-3xl font-bold">Completed</h1>
                                <p className="text-sm">Tasks completed</p>
                            </div>
                        </div>
                        {/* render tasks */}
                        <ul className="w-full mt-4 p-4">
                            {tasks.length > 0 && tasks.filter((task) => task.completed).map((task) => {
                                return (
                                    <li className="flex items-center w-full shadow-md py-4 px-2 mb-4 bg-gray-100 opacity-80 rounded-md " key={task.task_id}>
                                        <div className="border-r border-gray-300 p-2">

                                            <Checkbox
                                                crossOrigin={undefined}
                                                onClick={() => handleToggleTask(task.task_id)}
                                                defaultChecked={task.completed}
                                                ripple={false}
                                                className="h-8 w-8 rounded-full border border-gray-900/20 bg-gray-900/10 transition-all hover:scale-105 hover:before:opacity-0"
                                            />
                                        </div>

                                        <div className="flex flex-col justify-center px-5 flex-grow">

                                            <h1 className="text-xl md:text-2xl font-bold mb-2 line-through">{task.title}</h1>
                                            <small className="text-xs text-gray-600 ">Description</small>
                                            <p className="text-sm">{task.description}</p>
                                        </div>
                                        <div className="p-4 border-l">
                                            <TrashIcon className="h-6 w-6 text-red-500 cursor-pointer" />
                                        </div>
                                    </li>
                                )
                            })}
                        </ul>
                    </section>}


                    {/* Lista de tareas */}
                </div>
            </main>
        </div>
    );
};

export default Home;