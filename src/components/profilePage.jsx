
import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import WorldTimeComponent from "./countryTime";

const ProfilePage = ({ users }) => {
    const { id } = useParams();
    const user = users.find((user) => user.id.toString() === id);
    const [posts, setPosts] = useState([]);
    const [userPosts, setUserPosts] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null);
    const popupRef = useRef(null);

    const openPopup = (post) => {
        setSelectedPost(post);
    };

    const closePopup = () => {
        setSelectedPost(null);
    };

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then((res) => res.json())
            .then((data) => setPosts(data))
            .catch((error) => console.error("Something Went Wrong!", error));
    }, []);

    useEffect(() => {
        const filteredPosts = posts.filter((post) => post.userId === parseInt(id));
        setUserPosts(filteredPosts);
    }, [id, posts]);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (popupRef.current && !popupRef.current.contains(e.target)) {
                closePopup();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    if (!user) {
        return <div>User not found</div>;
    }

    return (
        <div className="border-r-[20px] border-r-[black] border-l-[20px] border-[gold]">
            <h1 className=" text-center p-5 text-white bg-[#0b0618] font-serif text-[25px]">User Profile</h1>
            <WorldTimeComponent />
            <div className="wrap">
                <div className="flex m-6 rounded-3xl justify-between border-t-4 border-l-4 border-[#18020d] p-5 shadow-lg">
                    <div className="left" >
                        <h1><span className=" font-serif text-red-500"> Name: </span><span className=" text-purple-950">{user.name}</span></h1>
                        <p><span className=" font-serif text-red-500">User Name: </span>{user.username}</p>
                        <p>Catch phrase: <span className=" text-[#37ca43]"> {user.company.catchPhrase}</span></p>
                    </div>
                    <div className="right">
                        <h3><span className=" font-serif text-red-500">Address: </span ><span className=" text-[#296c86]">{user.address.street}, {user.address.city}, {user.address.zipcode}</span></h3>
                        <p className=" font-serif"><span className=" text-red-500">Email:</span> {user.email}</p>
                        <p>Phone: <span className=" text-[#b92d7f]"> {user.phone}</span></p>
                    </div>
                </div>
                <div className="posts flex flex-wrap justify-center">
                    {userPosts.map((post) => (
                        <div
                            key={post.id}
                            className="hover:cursor-pointer border-t-4 border-b-4 border-l-4 border-[#18020d] shadow-lg bg-[rgb(236,250,235)] p-7 text-[#270c0c] rounded-lg m-4 md:w-[25%] w-full text-center"
                        >
                            <div onClick={() => openPopup(post)}>
                                <strong className=" text-[20px]">{post.title}</strong>
                                <br />
                                <br />
                                <i className="text-[#1f6e2c]">{post.body}</i>
                            </div>
                        </div>
                    ))}
                </div>
                {selectedPost && (
                    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
                        <div ref={popupRef} className="max-w-2xl shadow-lg bg-[rgb(250,252,250)] p-7 text-[#270c0c] rounded-lg m-4 md:w-[75%] w-full text-center">
                            <h2 className=" text-[20px] text-[navy] font-extrabold m-2">{selectedPost.title}</h2>
                            <p><i className=" font-mono text-[red]">{selectedPost.body}</i></p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ProfilePage;

