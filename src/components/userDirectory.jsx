
import { Link } from "react-router-dom";
const UserDirectoryPage = (params) => {
    const { users } = params;
    return (
        <>
            <h1 className=" text-center p-5 bg-[gold] font-serif text-[50px]">Directory</h1>
            <div>
                {users.map((user) => (
                    <Link to={`/user/${user.id}`} className=" border-[gold] border-l-[20px] flex justify-between bg-slate-950 m-3 text-[gold] p-9 rounded-lg" key={user.id}>
                        <p>{user.name}</p>
                        <p>Posts :{users.length}</p>
                    </Link>
                ))}
            </div>

        </>
    )
}

export default UserDirectoryPage;

