import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser, deleteuser, updateUser } from "./redux/postsSlice";

export default function CrudForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [category, setCategory] = useState("");
  // const [items, setItems] = useState([]);
  const items = useSelector((state)=>state.post.posts);
const dispatch=useDispatch();
  // 1. تحميل البيانات من localStorage عند أول تحميل للتطبيق
  useEffect(() => {
    const storedPosts = localStorage.getItem("posts");
    if (storedPosts) {
      const parsedPosts = JSON.parse(storedPosts);
      if (parsedPosts.length > 0) {
        parsedPosts.forEach((post) => dispatch(addUser(post)));
      }
    }
  }, [dispatch]);

  // 2. حفظ أي تغيير في البيانات تلقائياً داخل localStorage
  useEffect(() => {
    localStorage.setItem("posts", JSON.stringify(items));
  }, [items]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      dispatch(updateUser({ id: editId, title :title, des: description ,category:category }));
      setIsEditing(false);
      setEditId(null);
    } else {
      dispatch(addUser({ id: items.length + 1, title:title, des: description ,category:category}));
    }
    // dispatch(addUser({id:items.length+1 , title:title , des:description}))
    setTitle("");
    setDescription("");
    setCategory("");
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-md">
        <h2 className="text-3xl  font-bold mb-4 text-center"> NoteCRUD </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Note Title"
            required
          />
        </div>

        <div>
        
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            rows="4"
            placeholder="Description"
            required
          />
        </div>
        <div>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Category</option>
            <option value="Personal">Personal</option>
            <option value="Work">Work</option>
            <option value="Ideas">Ideas</option>
            <option value="Study">Study</option>
            <option value="Goals">Goals</option>
          </select>
        </div>
    
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-sm hover:bg-blue-700 transition"
        >
          {isEditing ? "Update Post" : "Send"}
        </button>
      </form>
      {/* UI لعرض البيانات المضافة */}
      <div className="">
        {items.length > 0 ? (items.map((item) => (
            <div
              key={item.id}
              className="group bg-white border border-gray-200 rounded-2xl shadow-md p-5 hover:shadow-xl transition-all duration-300 w-full flex flex-col md:flex-row justify-between items-start gap-4 mt-2  "
            >
              {/* Left side: Title + Description */}
              <div className="flex-1 ">
                <h3 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition">
                  {item.title}
                </h3>
                <p className="text-gray-600 mt-2 text-sm">{item.des}</p>
              </div>
              {/* Right side: Category + Buttons */}
              <div className="flex flex-col items-start md:items-center gap-2 min-w-[120px]">
                <span
                  className={`text-xs font-medium px-3 py-1 rounded-full 
                    ${item.category === "Work"
                      ? "bg-blue-100 text-blue-600"
                      : item.category === "Personal"
                      ? "bg-green-100 text-green-600"
                      : item.category === "Ideas"
                      ? "bg-purple-100 text-purple-600"
                      : "bg-gray-100 text-gray-500"}
                  `}
                >
                {item.category || "Uncategorized"}
                </span>
                <div className="flex gap-2 mt-2 flex-wrap">
                  <button
                    className="px-3 py-1 text-sm bg-green-500 hover:bg-green-600 text-white rounded-md transition "
                    onClick={() => {
                      setIsEditing(true);
                      setEditId(item.id);
                      setTitle(item.title);
                      setDescription(item.des);
                      setCategory(item.category);
                    }}
                  >
                    Update
                  </button>
                  <button
                    className="px-3 py-1 text-sm bg-red-500 hover:bg-red-600 text-white rounded-md transition"
                    onClick={() => dispatch(deleteuser(item.id))}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
        ))
        ):
          <h2 className="text-center col-span-full text-gray-400 text-sm font-semibold mt-1">
            There are no notes.
          </h2>
        }
      </div>


    </div>
    
    
  );
}
