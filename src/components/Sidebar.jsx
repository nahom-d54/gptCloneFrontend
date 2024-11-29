import { AiOutlinePlus, AiOutlineSetting } from "react-icons/ai";
import { BiLinkExternal } from "react-icons/bi";

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

const Sidebar = () => {
  const { data: chatHistory } = useGetChatHistoryQuery({ page: 1, limit: 5 });
  const [deleteChat] = useDeleteChatMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const clearChatAndNavigate = () => {
    dispatch(clearMessages());
    navigate("/");
  };
  console.log(chatHistory);
  return (
    <div className="scrollbar-trigger flex h-full w-full flex-1 items-start border-white/20">
      <nav className="flex h-full flex-1 flex-col space-y-1 p-2">
        <a
          onClick={clearChatAndNavigate}
          className="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm mb-1 flex-shrink-0 border border-white/20"
        >
          <AiOutlinePlus className="h-4 w-4" />
          New chat
        </a>
        <div className="flex-col flex-1 overflow-y-auto border-b border-white/20">
          <div className="flex flex-col gap-2 pb-2 text-gray-100 text-sm">
            {/* <a className="flex py-3 px-3 items-center gap-3 relative rounded-md hover:bg-[#2A2B32] cursor-pointer break-all hover:pr-4 group">
              <FiMessageSquare className="h-4 w-4" />
              <div className="flex-1 text-ellipsis max-h-5 overflow-hidden break-all relative">
                New conversation
                <div className="absolute inset-y-0 right-0 w-8 z-10 bg-gradient-to-l from-gray-900 group-hover:from-[#2A2B32]"></div>
              </div>
            </a> */}

            {chatHistory &&
              chatHistory?.[0].data.map((chat) => (
                <div
                  className="hover:bg-[#2A2B32] hover:pr-4 rounded-md group flex relative"
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
                  <div className="absolute top-[30%] right-0 px-2  text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => deleteChat(chat._id)}>
                      <MdDeleteOutline className="text-red-500 h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <a className="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm">
          <AiOutlineSetting className="h-4 w-4" />
          Settings
        </a>
        <a
          href="https://help.openai.com/en/collections/3742473-chatgpt"
          target="_blank"
          className="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm"
        >
          <BiLinkExternal className="h-4 w-4" />
          Get help
        </a>
        <a
          onClick={() => dispatch(logout())}
          className="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm"
        >
          <MdLogout className="h-4 w-4" />
          Log out
        </a>
      </nav>
    </div>
  );
};

export default Sidebar;
