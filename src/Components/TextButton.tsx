/* eslint-disable max-len */
import classNames from "classnames";
import React from "react";

type Props = {
  children: React.ReactNode;
  onClick?: () => void;
  active?: boolean;
};

export const TextButton: React.FC<Props> = ({ children, onClick, active }) => {
  return (
    <button
      className={classNames(
        "hover:shadow-button-hover shadow-Primary group h-full w-full border transition-all ",
        {
          "border-Elements active:bg-Primary active:border-Primary bg-white":
            active,
          "border-Primary bg-Primary  active:border-Elements active:bg-white":
            !active,
        },
      )}
      type="button"
      onClick={onClick}
    >
      <span
        className={classNames({
          "text-Green group-active:text-white": active,
          "group-active:text-Green text-white": !active,
        })}
      >
        {children}
      </span>
    </button>
  );
};
