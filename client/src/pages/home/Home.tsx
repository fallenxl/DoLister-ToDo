import { useEffect, useState } from "react";
import { ComplexNavbar } from "../../components/navbar/Navbar";
import { Task } from "../../interfaces";
import { getAllTasks } from "../../services/task.services";
import { Checkbox } from "@material-tailwind/react";

const Home = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    useEffect(() => {
        getAllTasks().then((tasks) => {
            setTasks(tasks);
            console.log(tasks);
        });
    }, [])

    return (
        <div className="bg-gray-50 w-full h-screen p-4">
            <ComplexNavbar />
            <main className="flex justify-center mt-10 ">
                <div className="w-[70rem]">
                    <section >
                        <div className="flex justify-between w-full border-b p-4 ">
                            <div className="flex flex-col justify-center ">
                                <h1 className="text-3xl font-bold">To Do</h1>
                                <p className="text-sm">Tasks to do</p>
                            </div>
                        </div>
                        {/* render tasks */}
                        <ul className="w-full mt-4 p-4">
                            {tasks.length > 0 && tasks.filter((task) => !task.completed).map((task) => {
                                return (
                                    <li className="flex  w-full shadow-md py-4 px-6 bg-white rounded-md " key={task.task_id}>
                                        <div className="border-r border-gray-300 p-2">
                                            <Checkbox
                                                crossOrigin={undefined}
                                                defaultChecked={false}
                                                ripple={false}
                                                className="h-8 w-8 rounded-full border border-gray-900/20 bg-gray-900/10 transition-all hover:scale-105 hover:before:opacity-0"
                                            />
                                        </div>
                                        <div className="flex flex-col justify-center px-5">
                                            <h1 className="text-2xl font-bold mb-2">{task.title}</h1>
                                            <small className="text-xs text-gray-600 ">Description</small>
                                            <p className="text-sm">{task.description}</p>
                                        </div>
                                       
                                    </li>
                                )
                            })}
                        </ul>
                    </section>

                    <section >
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
                                    <li className="flex  w-full shadow-md py-4 px-6 bg-gray-100 opacity-80 rounded-md " key={task.task_id}>
                                        <div className="border-r border-gray-300 p-2">

                                            <Checkbox
                                                crossOrigin={undefined}
                                                defaultChecked
                                                ripple={false}
                                                className="h-8 w-8 rounded-full border border-gray-900/20 bg-gray-900/10 transition-all hover:scale-105 hover:before:opacity-0"
                                            />
                                        </div>

                                        <div className="flex flex-col justify-center px-5">

                                            <h1 className="text-2xl font-bold mb-2 line-through">{task.title}</h1>
                                            <small className="text-xs text-gray-600 ">Description</small>
                                            <p className="text-sm">{task.description}</p>
                                        </div>
                                    </li>
                                )
                            })}
                        </ul>
                    </section>


                    {/* Lista de tareas */}
                </div>
            </main>
        </div>
    );
};

export default Home;