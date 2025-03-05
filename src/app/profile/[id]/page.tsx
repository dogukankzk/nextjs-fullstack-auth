/* eslint-disable @typescript-eslint/no-explicit-any */
export default function UserProfile({params}: any){
    return(
        <div className=" flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile page</h1>
            <hr />
            <p className="my-2 text-2xl">profile <span className="bg-red-400 text-black p-2 rounded">{params.id}</span></p>
        </div>
    )
}