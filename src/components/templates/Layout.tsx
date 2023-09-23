import React from "react";
import Sidebar from "../organisms/Sidebar";
import Topbar from "../organisms/Topbar";

export type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FunctionComponent<LayoutProps> = ({ children }) => {
  return (
    <div className={"dark:text-dark-text-grey text-small"}>
      <Sidebar />
      <Topbar />
      <div className="h-screen bg-light-background dark:bg-dark-background ml-64 pt-24">
        <div className="p-8">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
