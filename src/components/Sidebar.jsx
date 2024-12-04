import { AiOutlinePlus } from "react-icons/ai";

import { MdDeleteOutline, MdLogout } from "react-icons/md";
import {
  useDeleteChatMutation,
  useGetChatHistoryQuery,
} from "../services/chat/chatApiSlice";
import { Link, useNavigate } from "react-router-dom";
import { BsChat } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { clearMessages } from "../features/chats/chatSlice";
import { useState } from "react";
import { FaUserEdit } from "react-icons/fa";

const Sidebar = () => {
  const [params, setParams] = useState({ page: 1, limit: 5 });
  const { data: chatHistory, isError } = useGetChatHistoryQuery(params);

  // eslint-disable-next-line no-unused-vars
  const handleButtonClick = () => {
    setParams({ page: 2, limit: 10 }); // Example of changing params
  };
  const [deleteChat] = useDeleteChatMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const clearChatAndNavigate = () => {
    dispatch(clearMessages());
    navigate("/");
  };

  return (
    <div className="scrollbar-trigger flex h-full w-full flex-1 items-start border-white/20 dark:bg-gray-900 bg-white">
      <nav className="flex h-full flex-1 flex-col space-y-1 p-2">
        <a
          onClick={clearChatAndNavigate}
          className="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-black dark:text-white cursor-pointer text-sm mb-1 flex-shrink-0 border border-white/20"
        >
          <AiOutlinePlus className="h-4 w-4" />
          New Chat
        </a>
        <div className="flex-col flex-1 overflow-y-auto border-b border-white/20">
          <div className="flex flex-col gap-2 pb-2 text-gray-900 dark:text-gray-100 text-sm h-full overflow-y-auto">
            {isError && (
              <div className="m-2 p-2 border-red-500 text-red-500 background-transparent">
                Something went wrong
              </div>
            )}

            {chatHistory &&
              chatHistory?.[0].data.map((chat) => (
                <div
                  className="hover:bg-gray-200 dark:hover:bg-[#2A2B32] hover:pr-4 rounded-md group flex relative"
                  key={chat._id}
                >
                  <Link
                    to={`/chat/${chat._id}`}
                    key={chat._id}
                    className="w-full flex py-3 px-3 items-center gap-3 cursor-pointer break-all"
                  >
                    <BsChat className="h-4 w-4" />
                    {chat.chatTitle}
                  </Link>
                  <div className="absolute top-[30%] right-0 px-2 text-black dark:text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => deleteChat(chat._id)}>
                      <MdDeleteOutline className="text-red-500 h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            {chatHistory && chatHistory?.[0].nextPage && (
              <button className="mt-auto text-black dark:text-white bg-transparent border-gray-300 border-[1px] rounded-sm px-3 py-2">
                Load More
              </button>
            )}
          </div>
        </div>
        <Link
          to="/profile"
          className="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-black dark:text-white cursor-pointer text-sm"
        >
          <FaUserEdit className="h-4 w-4" />
          Profile
        </Link>

        <a
          onClick={() => dispatch(logout())}
          className="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-black dark:text-white cursor-pointer text-sm"
        >
          <MdLogout className="h-4 w-4" />
          Log out
        </a>
      </nav>
    </div>
  );
};

export default Sidebar;
