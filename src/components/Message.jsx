import { SiOpenai } from "react-icons/si";
import { HiUser } from "react-icons/hi";
import { TbCursorText } from "react-icons/tb";
import PropTypes from "prop-types";

import MarkdownRenderer from "./MarkdownRender";

const Message = (props) => {
  const { message } = props;

  const { role, content: text } = message;
  const isUser = role === "user";

  return (
    <>
      <div
        className={`group w-full text-gray-800 dark:text-gray-100 border-b border-black/10 dark:border-gray-900/50 ${
          isUser
            ? "bg-gray-300 dark:bg-gray-900/50"
            : "bg-gray-50 dark:bg-gray-700/40"
        }`}
      >
        <div className="text-base gap-4 md:gap-6 md:max-w-2xl lg:max-w-xl xl:max-w-3xl flex lg:px-0 m-auto w-full">
          <div className="flex flex-col sm:flex-row gap-4 md:gap-6 md:max-w-2xl lg:max-w-xl xl:max-w-3xl p-4 md:py-6 lg:px-0 m-auto w-full">
            <div className="w-8 flex flex-col relative items-end">
              <div className="relative h-7 w-7 p-1 rounded-sm text-white flex items-center justify-center bg-black/75 dark:bg-gray-700 text-opacity-100">
                {isUser ? (
                  <HiUser className="h-4 w-4 text-white" />
                ) : (
                  <SiOpenai className="h-4 w-4 text-white" />
                )}
              </div>
              <div className="text-xs flex items-center justify-center gap-1 absolute left-0 top-2 -ml-4 -translate-x-full group-hover:visible !invisible">
                <button
                  disabled
                  className="text-gray-300 dark:text-gray-400"
                ></button>
                <span className="flex-grow flex-shrink-0 text-gray-800 dark:text-gray-100">
                  1 / 1
                </span>
                <button
                  disabled
                  className="text-gray-300 dark:text-gray-400"
                ></button>
              </div>
            </div>
            <div className="w-full">
              {!isUser && text === null ? (
                <TbCursorText className="h-6 w-6 animate-pulse text-gray-800 dark:text-gray-100" />
              ) : (
                <MarkdownRenderer markdown={text} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
Message.propTypes = {
  message: PropTypes.shape({
    role: PropTypes.string,
    content: PropTypes.string,
  }),
};

export default Message;
