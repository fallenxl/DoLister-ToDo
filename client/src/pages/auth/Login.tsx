import { useState } from "react";
import { AuthCredentials } from "../../interfaces";
import { signIn } from "../../services/auth.service";
import { useNavigate } from "react-router-dom";
import { setLocalStorage } from "../../utils";
import { LocalStorageKeys } from "../../constants";
import Loading from "../../components/loader/Loading";

const Login = () => {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState<AuthCredentials>({
        email: "",
        password: "",
    });
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        signIn(credentials).then((res) => {
            setIsLoading(false);
            if (!res) return setError("Email or password is incorrect");
            setLocalStorage(LocalStorageKeys.DATA, res);
            navigate("/", { replace: true });

        });
    };



    return (
        <main className="h-screen relative bg-gray-50">
            {isLoading && <Loading />}
            <div className="flex justify-center items-center h-full w-full">

                <div className="flex flex-col justify-center w-full h-full lg:w-5/6 2xl:w-2/6 lg:h-4/6 shadow-md p-10 rounded-md bg-white">

                    <div className="mb-10">
                        <h1 className="text-4xl font-bold mb-4">Welcome back 👋</h1>
                        <small className="text-gray-500 mb-4">Today is a new day. It's your day. You shape it.
                            Sign in to start managing your projects.</small>
                    </div>

                    {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-2" role="alert">
                        <span className="block sm:inline">{error}</span>
                    </div>}
                    <form onSubmit={handleSubmit} className="flex flex-col  w-full gap-5 text-[#8897AD]">
                        <div className="w-full ">
                            <label htmlFor="email" className="font-bold">Email:</label>
                            <input value={credentials.email} onChange={handleChange} name='email' type="text" placeholder="Example@email.com" className="border rounded-lg p-2 bg-[#F7FBFF] border-[#D4D7E3] w-full outline-none" />
                        </div>
                        <div className="w-full ">
                            <label htmlFor="email" className="font-bold">Password:</label>
                            <input value={credentials.password} onChange={handleChange} name='password' type="password" placeholder="************"
                                className="border rounded-lg p-2 bg-[#F7FBFF] border-[#D4D7E3] w-full outline-none" />
                        </div>
                        <button className="bg-[#162D3A] text-white px-4 py-2 rounded-lg w-full">Login</button>
                    </form>

                    <small className="text-gray-500 mt-4 text-center mb-10">Don't have an account? <a href="/register" className="text-blue-500">Sign up</a></small>

                    {/* powered by */}
                    <small className="text-gray-400 text-center" >Powered by <a className="underline hover:text-gray-500" href="https://github.com/fallenxl" target="_blank" >FallEn</a></small>

                </div>
            </div>
        </main>
    )
};

export default Login