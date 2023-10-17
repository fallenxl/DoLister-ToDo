import { Spinner } from "@material-tailwind/react";

const Loading = () => {
    return(
        <>
            <div className="absolute top-0 left-0 w-full h-full opacity-90 bg-gray-50 flex justify-center items-center">
                <Spinner className="h-20 w-20" />
            </div>
        </>
    )
};

export default Loading;