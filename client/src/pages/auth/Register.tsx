import { useState } from "react";
import { RegisterCredentials } from "../../interfaces";
import { signUp } from "../../services/auth.service";
import { useNavigate } from "react-router-dom";
import { setLocalStorage } from "../../utils";
import { LocalStorageKeys } from "../../constants";

const Register = () => {
    const navigate = useNavigate();
    const [registerCredentials, setRegisterCredentials] = useState<RegisterCredentials>({
        username: "",
        email: "",
        password: "",
    });

    const [error, setError] = useState<string | null>(null);
    const [confirmPassword, setConfirmPassword] = useState<string>("");

    const handleConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRegisterCredentials({
            ...registerCredentials,
            [e.target.name]: e.target.value,
        });
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (registerCredentials.password !== confirmPassword) return setError("Passwords don't match");
        signUp(registerCredentials).then((res) => {
            if(!res) return console.log("Something went wrong");
            setLocalStorage(LocalStorageKeys.DATA, res);
            navigate("/", { replace: true });
        });
    }
    return (
        <main className="h-screen relative bg-gray-50">
            <div className="flex justify-center items-center h-full w-full">

                <div className="flex flex-col justify-center w-full h-full xl:h-auto lg:w-5/6 2xl:w-2/6 shadow-md p-10 rounded-md bg-white">
                    <div className="mb-10">
                        <h1 className="text-4xl font-bold mb-4">Create an account 👋</h1>
                        <small className="text-gray-500 mb-4">Today is a new day. It's your day. You shape it.
                            Sign in to start managing your projects.</small>
                    </div>
                    {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-2" role="alert">
                        <span className="block sm:inline">{error}</span>
                    </div>}

                    <form onSubmit={handleSubmit} className="flex flex-col  w-full gap-5 text-[#8897AD]">
                        <div className="w-full ">
                            <label htmlFor="username" className="font-medium">Username:</label>
                            <input name='username' value={registerCredentials.username} onChange={handleChange} type="text" 
                            placeholder="@example" className=" text-sm border rounded-lg p-2 bg-[#F7FBFF] border-[#D4D7E3] w-full outline-none" required/>
                        </div>
                        <div className="w-full ">
                            <label htmlFor="email" className="font-medium">Email:</label>
                            <input name='email' value={registerCredentials.email} onChange={handleChange} type="email" 
                            placeholder="Example@email.com" className=" text-sm border rounded-lg p-2 bg-[#F7FBFF] border-[#D4D7E3] w-full outline-none" required/>
                        </div>
                        <div className="w-full ">
                            <label htmlFor="email" className="font-medium">Password:</label>
                            <input name='password' value={registerCredentials.password} onChange={handleChange} type="password" placeholder="At least 8 characters"
                                className="border rounded-lg p-2 bg-[#F7FBFF] text-sm  border-[#D4D7E3] w-full outline-none" />
                        </div>
                        <div className="w-full mb-10">
                            <label htmlFor="confirmpassword" className="font-medium">Confirm password:</label>
                            <input name='confirmpassword' value={confirmPassword} onChange={handleConfirmPassword} type="password" placeholder="Repeat your password"
                                className="border rounded-lg p-2 bg-[#F7FBFF] text-sm  border-[#D4D7E3] w-full outline-none" />
                        </div>

                        <button className="bg-[#162D3A] text-white px-4 py-2 rounded-lg w-full">Register</button>
                    </form>

                    <small className="text-gray-500 mt-4 mb-10 text-center">Do you have an account? <a href="/login" className="text-blue-500">Sign in</a></small>
                    <small className="text-gray-400 text-center" >Powered by <a className='underline hover:text-gray-500' href="https://github.com/fallenxl" target="_blank" >FallEn</a></small>
                </div>
            </div>
        </main>
    )
};

export default Register