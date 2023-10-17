import {
    Dialog,
    Card,
    CardBody,
    CardFooter,
    Input,
    Textarea,
} from "@material-tailwind/react";
import { Task, TaskDTO } from "../../interfaces";
import { createTask } from "../../services/task.services";
import { useState } from "react";

interface Props {
    open: boolean;
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
    handler: () => void;
}

export function ModalCreateTask({ open, handler, setTasks }: Props) {

    const [task, setTask] = useState<TaskDTO>({
        title: "",
        description: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setTask((task) => ({ ...task, [e.target.name]: e.target.value }));
    };
    const handleCreateTask = () => {
        if(!task.title || !task.description) return alert("Please fill all the fields");
        createTask(task).then((task) => {
            setTasks((tasks) => [...tasks, task]);
            handler();
        });
    };

    return (
        <>
            <Dialog
                size="xl"
                open={open}
                handler={handler}
                className="bg-transparent shadow-none"
            >
                <Card className="mx-auto w-full max-w-[50rem]">
                    <CardBody className="flex flex-col gap-4">
                        <h1 className="text-3xl font-bold">Create Task</h1>
                        <div className="flex flex-col gap-4">
                            <Input name="title" value={task.title} onChange={handleChange} crossOrigin={undefined} className="font-poppins" type="text" label="Title" />
                            <Textarea name="description" value={task.description} onChange={handleChange} label="Description" className="font-poppins" />
                            <div className="flex justify-center">
                                <button onClick={handler} className="bg-gray-500 hover:bg-red-400 text-white px-4 py-2 rounded-md mr-2 flex items-center gap-2">
                                    Cancel
                                </button>
                                <button onClick={handleCreateTask} className="bg-gray-500 hover:bg-green-400 text-white px-4 py-2 rounded-md mr-2 flex items-center gap-2">
                                    Add task
                                </button>
                            </div>

                        </div>
                    </CardBody>
                    <CardFooter className="pt-0">


                    </CardFooter>
                </Card>
            </Dialog>
        </>
    );
}