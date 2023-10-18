import { useEffect, useState } from "react";
import { ComplexNavbar } from "../../components/navbar/Navbar";
import { Task } from "../../interfaces";
import { deleteAllTasks, deleteSelectedTasks, deleteTask, getAllTasks, toggleTaskCompleted } from "../../services/task.services";
import { Checkbox } from "@material-tailwind/react";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { ModalCreateTask } from "./ModalCreateTask";
import { getDays } from "../../utils";
import Swal from "sweetalert2";

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

    const handleDeleteTask = (id: string) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You will not be able to recover this task!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#10B981',
            cancelButtonColor: '#EF4444',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteTask(id).then(() => {
                    setTasks(tasks.filter((task) => task.task_id !== id));
                    setSelectedTask(selectedTask.filter((taskId) => taskId !== id));
                });
                Swal.fire(
                    'Deleted!',
                    'Your task has been deleted.',
                    'success'
                )
            }
        })
    };
    const handleDeleteSelectedTasks = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You will not be able to recover this tasks!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#10B981',
            cancelButtonColor: '#EF4444',
            confirmButtonText: 'Yes, delete them!'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteSelectedTasks(selectedTask).then(() => {
                    setTasks(tasks.filter((task) => !selectedTask.includes(task.task_id)));
                    setSelectedTask([]);
                });
                Swal.fire(
                    'Deleted!',
                    'Your tasks has been deleted.',
                    'success'
                )
            }
        }
        )
    };
    const handleDeleteAllTasks = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You will not be able to recover this tasks!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#10B981',
            cancelButtonColor: '#EF4444',
            confirmButtonText: 'Yes, delete them!'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteAllTasks().then(() => {
                    setTasks([]);
                    setSelectedTask([]);
                });
                Swal.fire(
                    'Deleted!',
                    'Your tasks has been deleted.',
                    'success'
                )
            }
        })
    }
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);

    return (
        <div className="bg-gray-50 w-full min-h-screen p-4">
            <ModalCreateTask setTasks={setTasks} open={open} handler={handleOpen} />
            <ComplexNavbar />
            <main className="flex justify-center mt-10 min-h-[calc(100vh-200px)]">
                <div className="w-full flex flex-col xl:w-3/4  2xl:flex-row  gap-2 ">
                    <section className="w-full" >
                        <div className="flex flex-col lg:flex-row justify-between w-full border-b p-4 ">
                            <div className="flex flex-col  justify-center mb-4 xl:mb-0 ">
                                <h1 className="text-3xl font-bold">To Do</h1>
                                <p className="text-sm">Tasks to do</p>
                            </div>
                            <div className="flex gap-1  items-center ">
                                {/* add task*/}
                                <button onClick={handleOpen} className="bg-gray-500 text-sm hover:bg-green-400 text-white p-2 rounded-md mr-2 flex flex-grow lg:flex-grow-0 items-center gap-2">
                                    <PlusIcon className="h-6 w-6" />
                                    Add task
                                </button>
                                <button onClick={handleDeleteAllTasks} className="bg-gray-500 text-sm hover:bg-red-400 text-white flex-grow p-2 lg:flex-grow-0  rounded-md mr-2 flex  items-center gap-2">
                                    <TrashIcon className="h-6 w-6" />
                                    Clear board
                                </button>
                                {selectedTask.length > 0 && <button onClick={handleDeleteSelectedTasks} className="bg-gray-500 text-sm hover:bg-red-400  flex-grow lg:flex-grow-0 text-white p-2 rounded-md mr-2 flex items-center gap-2">
                                    <TrashIcon className="h-6 w-6" />
                                    {`Delete ${selectedTask.length} tasks`}
                                </button>}
                            </div>
                        </div>
                        {/* render tasks */}
                        <ul className="w-full mt-4 p-4">
                            {tasks.filter(task => !task.completed).length > 0 ? tasks.filter((task) => !task.completed).map((task) => {
                                return (
                                    <li className={`flex items-center w-full shadow-md py-4 px-2 mb-4 ${isTaskSelected(task.task_id) ? "bg-blue-gray-50 opacity-80" : "bg-white"} duration-300 rounded-md `} key={task.task_id}>
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
                                        <small className="hidden md:block text-xs text-gray-600 px-4">{getDays(task.created_at)}</small>
                                        <button onClick={() => handleDeleteTask(task.task_id)} className="p-4 border-l">
                                            <TrashIcon className="h-6 w-6 text-red-500 cursor-pointer" />
                                        </button>

                                    </li>
                                )
                            }) : <div className="flex  items-center justify-center w-full h-full gap-2">
                                <small className="text-gray-500 text-sm">No tasks to do</small>
                                <button onClick={handleOpen} className="text-sm underline rounded-md mr-2 flex items-center gap-2">
                                    Add task
                                </button>
                            </div>}
                        </ul>
                    </section>

                    <section className="w-full">
                        <div className="flex justify-between w-full border-b p-4 ">
                            <div className="flex flex-col justify-center ">
                                <h1 className="text-3xl font-bold">Completed</h1>
                                <p className="text-sm">Tasks completed</p>
                            </div>
                        </div>
                        {/* render tasks */}
                        <ul className="w-full mt-4 p-4">
                            {tasks.filter(task => task.completed).length > 0 ? tasks.filter((task) => task.completed).map((task) => {
                                return (
                                    <li
                                        className={`flex items-center w-full shadow-md py-4 px-2 mb-4  ${isTaskSelected(task.task_id) ? "bg-blue-gray-50" : "bg-gray-100"} opacity-80 rounded-md `} key={task.task_id}>
                                        <div className="border-r border-gray-300 p-2">

                                            <Checkbox
                                                crossOrigin={undefined}
                                                onClick={() => handleToggleTask(task.task_id)}
                                                defaultChecked={task.completed}
                                                ripple={false}
                                                className="h-8 w-8 rounded-full border border-gray-900/20 bg-gray-900/10 transition-all hover:scale-105 hover:before:opacity-0"
                                            />
                                        </div>

                                        <div onClick={() => handleSelectedTask(task.task_id)} className="flex flex-col justify-center px-5 flex-grow">

                                            <h1 className="text-xl md:text-2xl font-bold mb-2 line-through">{task.title}</h1>
                                            <small className="text-xs text-gray-600 ">Description</small>
                                            <p className="text-sm">{task.description}</p>
                                        </div>
                                        <button onClick={() => handleDeleteTask(task.task_id)} className="p-4 border-l">
                                            <TrashIcon className="h-6 w-6 text-red-500 cursor-pointer" />
                                        </button>
                                    </li>
                                )
                            }) : <div className="flex  items-center justify-center w-full h-full gap-2">
                                <small className="text-gray-500 text-sm">No tasks completed</small>
                            </div>}
                        </ul>
                    </section>
                </div>
            </main>
            {/* footer */}
            <small className="text-center block w-full mt-10 text-gray-500">
                &copy; 2023 DoLister. All rights reserved.
                Powered by <a href="https://github.com/fallenxl" target="_blank" className="underline hover:text-gray-600">FallEn</a>
            </small>
        </div>
    );
};

export default Home;