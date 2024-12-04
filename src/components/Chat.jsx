import { useEffect, useRef, useState } from "react";
import { FiSend } from "react-icons/fi";
import useAutoResizeTextArea from "../hooks/useAutoResizeTextArea";
import Message from "./Message";

import PropTypes from "prop-types";
import { BsPlusLg } from "react-icons/bs";
import {
  useGetMessagesQuery,
  useSendMessageMutation,
} from "../services/chat/chatApiSlice";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDarkMode } from "../hooks/useDarkMode";
import { FaMoon, FaSun } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import InfiniteScroll from "react-infinite-scroll-component";

const Chat = (props) => {
  const { toggleComponentVisibility } = props;

  const { chatId } = useParams();
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const location = useLocation();
  const [isDarkMode, toggleDarkMode] = useDarkMode();

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showEmptyChat, setShowEmptyChat] = useState(true);
  const [message, setMessage] = useState("");

  const textAreaRef = useAutoResizeTextArea();
  const bottomOfChatRef = useRef(null);
  useGetMessagesQuery(
    { chatId, page },
    { skip: !chatId, refetchOnMountOrArgChange: true }
  );
  const conversation = useSelector((state) => state.chat.messages);
  const isNext = useSelector((state) => state.chat.nextPage);

  const fetchNext = () => {
    if (isNext) {
      setPage(isNext);
    }
  };

  const [generateMessage] = useSendMessageMutation();

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "24px";
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  }, [message, textAreaRef]);

  useEffect(() => {
    if (conversation.length > 0) {
      if (bottomOfChatRef.current) {
        bottomOfChatRef.current.scrollIntoView({ behavior: "smooth" });
      }
      setShowEmptyChat(false);
    } else {
      setShowEmptyChat(true);
    }
  }, [conversation, setShowEmptyChat]);

  const sendMessage = async (e) => {
    e.preventDefault();

    setMessage("");
    if (message.length < 1) {
      setErrorMessage("Please enter a message.");
      return;
    } else {
      setErrorMessage("");
    }

    setIsLoading(true);

    const payload = {
      message: message,
      chat: chatId,
    };

    const response = await generateMessage(payload).unwrap();
    if (location.pathname !== `/chat/${response.chatId}`) {
      navigate(`/chat/${response.chatId}`);
    }

    setShowEmptyChat(false);
  };

  const handleKeypress = (e) => {
    if (e.keyCode == 13 && !e.shiftKey) {
      sendMessage(e);
      e.preventDefault();
    }
  };

  useEffect(() => {
    if (!showEmptyChat && bottomOfChatRef.current) {
      bottomOfChatRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [showEmptyChat, conversation]);

  return (
    <div className="dark flex max-w-full flex-1 flex-col">
      <button
        onClick={toggleDarkMode}
        className="absolute top-4 right-4 p-2 bg-gray-200 dark:bg-gray-700 rounded-full focus:outline-none"
      >
        {isDarkMode ? (
          <FaSun className="text-yellow-400" />
        ) : (
          <FaMoon className="text-gray-500" />
        )}
      </button>

      <div className="sticky top-0 z-10 flex items-center border-b border-white/20 bg-gray-800 pl-1 pt-1 text-gray-200 sm:pl-3 md:hidden">
        <button
          type="button"
          className="-ml-0.5 -mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-md hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white dark:hover:text-white"
          onClick={toggleComponentVisibility}
        >
          <span className="sr-only">Open sidebar</span>
          <RxHamburgerMenu className="h-6 w-6 text-white" />
        </button>
        <h1 className="flex-1 text-center text-base font-normal">New chat</h1>
        <button type="button" className="px-3">
          <BsPlusLg className="h-6 w-6" />
        </button>
      </div>
      <div className="relative h-full w-full transition-width flex flex-col overflow-hidden items-stretch flex-1">
        <div className="flex-1 overflow-hidden">
          <div className="h-full dark:bg-gray-800 overflow-y-auto">
            <div className="flex flex-col items-center text-sm bg-gray-800">
              {!showEmptyChat && conversation?.length > 0 ? (
                <>
                  <InfiniteScroll
                    dataLength={conversation.length}
                    next={fetchNext}
                    hasMore={Boolean(isNext)}
                    inverse={true}
                  >
                    {conversation &&
                      conversation?.map((message, index) => (
                        <Message key={index} message={message} />
                      ))}
                  </InfiniteScroll>

                  <div className="w-full h-32 md:h-48 flex-shrink-0"></div>
                  <div ref={bottomOfChatRef}></div>
                </>
              ) : null}
              {showEmptyChat ? (
                <div className="py-10 relative w-full flex flex-col h-full">
                  <h1 className="text-2xl sm:text-4xl font-semibold text-center text-gray-200 dark:text-gray-600 flex gap-2 items-center justify-center h-screen">
                    GROK
                  </h1>
                </div>
              ) : null}
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full border-t md:border-t-0 dark:border-white/20 md:border-transparent md:dark:border-transparent md:bg-vert-light-gradient bg-white dark:bg-gray-800 md:!bg-transparent dark:md:bg-vert-dark-gradient pt-2">
          <form className="stretch mx-2 flex flex-row gap-3 last:mb-2 md:mx-4 md:last:mb-6 lg:mx-auto lg:max-w-2xl xl:max-w-3xl">
            <div className="relative flex flex-col h-full flex-1 items-stretch md:flex-col">
              {errorMessage ? (
                <div className="mb-2 md:mb-0">
                  <div className="h-full flex ml-1 md:w-full md:m-auto md:mb-2 gap-0 md:gap-2 justify-center">
                    <span className="text-red-500 text-sm">{errorMessage}</span>
                  </div>
                </div>
              ) : null}
              <div className="flex flex-col w-full py-2 flex-grow md:py-3 md:pl-4 relative border border-black/10 bg-white dark:border-gray-900/50 dark:text-white dark:bg-gray-700 rounded-md shadow-[0_0_10px_rgba(0,0,0,0.10)] dark:shadow-[0_0_15px_rgba(0,0,0,0.10)]">
                <textarea
                  ref={textAreaRef}
                  value={message}
                  tabIndex={0}
                  data-id="root"
                  style={{
                    height: "24px",
                    maxHeight: "200px",
                    overflowY: "hidden",
                  }}
                  placeholder="Send a message..."
                  className="m-0 w-full resize-none outline-none border-0 bg-transparent p-0 pr-7 focus:ring-0 focus-visible:ring-0 dark:bg-transparent pl-2 md:pl-0"
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={handleKeypress}
                ></textarea>
                <button
                  disabled={isLoading || message?.length === 0}
                  onClick={sendMessage}
                  className="absolute p-1 rounded-md bottom-1.5 md:bottom-2.5 bg-transparent disabled:bg-gray-500 right-1 md:right-2 disabled:opacity-40"
                >
                  <FiSend className="h-4 w-4 mr-1 text-white " />
                </button>
              </div>
            </div>
          </form>
          <div className="px-3 pt-2 pb-3 text-center text-xs text-black/50 dark:text-white/50 md:px-4 md:pt-3 md:pb-6">
            <span>
              ChatGPT Clone may produce inaccurate information about people,
              places, or facts.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

Chat.propTypes = {
  toggleComponentVisibility: PropTypes.func.isRequired,
};

export default Chat;
