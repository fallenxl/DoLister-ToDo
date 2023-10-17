import { ComplexNavbar } from "../../components/navbar/Navbar";

const Home = () => {
    return (
        <div className="bg-gray-50 w-full h-screen p-4">
            <ComplexNavbar />
            <main className="flex justify-center mt-10 ">
                <div className="w-[70rem]">
                    <div className="flex justify-between w-full border-b p-4 ">
                        <h1 >Tasks</h1>
                        <div className="flex gap-2">
                            <button className="bg-blue-500 text-white rounded-md px-4 py-2">Add Task</button>
                        </div>
                    </div>

                    {/* Lista de tareas */}
                </div>
            </main>
        </div>
    );
};

export default Home;