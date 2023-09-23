import React from "react";

export type ButtonProps = {
  actionLabel: string;
  type?: "submit" | "button" | "reset";
  disabled?: boolean;
  onClick?: () => void;
};

const Button: React.FunctionComponent<ButtonProps> = ({
  actionLabel,
  type,
  disabled,
  onClick,
}) => {
  return (
    <button
      disabled={disabled}
      type={type}
      className=" bg-doing text-white block font-bold rounded-sm w-[300px] py-2 uppercase tracking-wider hover:scale-105 active:scale-100 transition  mx-auto disabled:cursor-not-allowed"
      onClick={onClick}
    >
      {actionLabel}
    </button>
  );
};

export default Button;
