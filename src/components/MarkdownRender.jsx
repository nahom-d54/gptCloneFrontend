import ReactMarkdown from "react-markdown";

import remarkGfm from "remark-gfm";
import remarkToc from "remark-toc";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";

import "highlight.js/styles/github-dark.css";
import PropTypes from "prop-types";

const MarkdownRenderer = ({ markdown }) => {
  const remarkPlugins = [remarkToc, remarkGfm];
  const rehypePlugins = [rehypeSlug, rehypeHighlight, rehypeRaw];

  const components = {
    // eslint-disable-next-line no-unused-vars
    code: ({ node, inline, className, children, ...props }) => {
      // eslint-disable-next-line no-unused-vars
      const match = /language-(\w+)/.exec(className || "");
      return !inline ? (
        <div className="relative">
          <pre className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-800 my-4">
            <code
              className={`${className} block whitespace-pre-wrap break-words p-4 rounded-lg bg-gray-800`}
              {...props}
            >
              {children}
            </code>
          </pre>
        </div>
      ) : (
        <code
          className="bg-gray-800 px-1 py-0.5 rounded text-sm font-mono"
          {...props}
        >
          {children}
        </code>
      );
    },
    p: ({ children }) => (
      <p className="mb-4 leading-relaxed break-words">{children}</p>
    ),
    h1: ({ children }) => (
      <h1 className="text-2xl font-bold mb-4 break-words">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-xl font-bold mb-3 break-words">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-lg font-bold mb-2 break-words">{children}</h3>
    ),
    ul: ({ children }) => (
      <ul className="list-disc pl-6 mb-4 break-words">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal pl-6 mb-4 break-words">{children}</ol>
    ),
    table: ({ children }) => (
      <div className="overflow-x-auto mb-4">
        <table className="min-w-full divide-y divide-gray-700">
          {children}
        </table>
      </div>
    ),
    img: ({ src, alt }) => (
      <img
        src={src}
        alt={alt}
        className="max-w-full h-auto my-4 rounded-lg"
        loading="lazy"
      />
    ),
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="p-4 text-black dark:text-white rounded-md">
        <ReactMarkdown
          remarkPlugins={remarkPlugins}
          rehypePlugins={rehypePlugins}
          components={components}
          className="ext-black dark:text-white  prose prose-invert max-w-none prose-pre:p-0 prose-pre:m-0 prose-pre:bg-transparent"
        >
          {markdown}
        </ReactMarkdown>
      </div>
    </div>
  );
};

MarkdownRenderer.propTypes = {
  markdown: PropTypes.string.isRequired,
};

export default MarkdownRenderer;
