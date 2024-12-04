const SkeletonChatLoader = () => {
  return (
    <div className="dark flex max-w-full flex-1 flex-col animate-pulse">
      {/* Dark Mode Toggle Button Skeleton */}
      <div className="absolute top-4 right-4 p-2 bg-gray-300 dark:bg-gray-700 rounded-full h-10 w-10"></div>

      {/* Header Skeleton */}
      <div className="sticky top-0 z-10 flex items-center border-b border-white/20 bg-gray-300 dark:bg-gray-800 pl-1 pt-1 sm:pl-3 md:hidden h-12">
        <div className="h-10 w-10 bg-gray-400 dark:bg-gray-600 rounded-md"></div>
        <div className="flex-1 mx-2 h-6 bg-gray-400 dark:bg-gray-600 rounded"></div>
        <div className="h-6 w-6 bg-gray-400 dark:bg-gray-600 rounded-md"></div>
      </div>

      {/* Content Skeleton */}
      <div className="relative h-full w-full transition-width flex flex-col overflow-hidden items-stretch flex-1">
        <div className="flex-1 overflow-hidden">
          <div className="h-full dark:bg-gray-800 bg-gray-300 overflow-y-auto">
            <div className="flex flex-col items-center text-sm bg-gray-300 dark:bg-gray-800">
              {/* Load More Button Skeleton */}
              <div className="w-32 h-10 bg-gray-400 dark:bg-gray-600 rounded my-4"></div>

              {/* Chat Messages Skeleton */}
              {[...Array(5)].map((_, index) => (
                <div
                  key={index}
                  className="w-11/12 h-16 bg-gray-400 dark:bg-gray-600 rounded my-2"
                ></div>
              ))}

              {/* Spacer for Chat End */}
              <div className="w-full h-32 md:h-48 flex-shrink-0"></div>
            </div>
          </div>
        </div>

        {/* Input Skeleton */}
        <div className="absolute bottom-0 left-0 w-full border-t dark:border-white/20 border-gray-400 md:border-transparent md:dark:border-transparent md:bg-vert-light-gradient bg-white dark:bg-gray-800 md:!bg-transparent dark:md:bg-vert-dark-gradient pt-2">
          <div className="stretch mx-2 flex flex-row gap-3 last:mb-2 md:mx-4 md:last:mb-6 lg:mx-auto lg:max-w-2xl xl:max-w-3xl">
            <div className="relative flex flex-col h-full flex-1 items-stretch md:flex-col">
              <div className="flex flex-col w-full py-2 flex-grow md:py-3 md:pl-4 relative border border-gray-400 dark:border-gray-900 bg-gray-200 dark:bg-gray-700 rounded-md shadow-[0_0_10px_rgba(0,0,0,0.10)] dark:shadow-[0_0_15px_rgba(0,0,0,0.10)]">
                <div className="h-6 bg-gray-400 dark:bg-gray-600 rounded w-full"></div>
              </div>
            </div>
          </div>
          <div className="px-3 pt-2 pb-3 text-center text-xs text-black/50 dark:text-white/50 md:px-4 md:pt-3 md:pb-6">
            <div className="h-4 bg-gray-400 dark:bg-gray-600 rounded w-3/4 mx-auto"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonChatLoader;
