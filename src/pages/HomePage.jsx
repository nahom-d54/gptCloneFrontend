import { Suspense, useState, lazy } from "react";

import MobileSiderbar from "../components/MobileSidebar";
import Sidebar from "../components/Sidebar";
import SkeletonChatLoader from "../components/SkeletonChatLoader";

const Chat = lazy(() => import("../components/Chat"));

//import useAnalytics from "../hooks/useAnalytics";

export default function Home() {
  const [isComponentVisible, setIsComponentVisible] = useState(false);

  const toggleComponentVisibility = () => {
    setIsComponentVisible(!isComponentVisible);
  };

  return (
    <main className="overflow-hidden w-full h-screen relative flex">
      {isComponentVisible ? (
        <MobileSiderbar toggleComponentVisibility={toggleComponentVisibility} />
      ) : null}
      <div className="hidden flex-shrink-0 bg-gray-900 md:flex md:w-[260px] md:flex-col">
        <div className="flex h-full min-h-0 flex-col ">
          <Sidebar />
        </div>
      </div>
      <Suspense fallback={<SkeletonChatLoader />}>
        <Chat toggleComponentVisibility={toggleComponentVisibility} />
      </Suspense>
    </main>
  );
}
