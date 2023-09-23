import React from "react";

export type ColumnProps = {};

const Column: React.FunctionComponent<ColumnProps> = (props) => {
  return (
    <div className="w-[400px]">
      <div className="flex flex-col gap-10">
        <div className="flex gap-2 items-center dark:text-dark-text-secondary">
          <div className="rounded-full bg-white h-5 w-5"></div>
          <h3 className="font-bold tracking-widest uppercase text-md">
            Title ()
          </h3>
        </div>
        <div className="dark:bg-dark-main-color py-7 px-5 rounded-lg shadow-xl cursor-pointer">
          <h3 className="text-md dark:text-dark-text-primary font-bold">
            Build UI for onboarding flow
          </h3>
          <p className="text-sm dark:text-dark-text-secondary">
            0 to 3 substacks
          </p>
        </div>
      </div>
    </div>
  );
};

export default Column;
