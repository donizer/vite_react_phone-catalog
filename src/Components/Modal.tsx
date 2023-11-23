import closeIco from "../assets/Icons/Close.svg";
import { typographyStyle } from "../CustomStyles/Typography";

type Props = {
  message: string;
  onClick: (e: string) => void;
};

export const Modal: React.FC<Props> = ({ message, onClick }) => {
  const handleClose = () => {
    onClick("");
  };

  return (
    <div
      className="absolute top-0 z-50 flex h-full w-full items-center justify-center bg-black/50"
      onClick={handleClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex h-60 w-[560px] flex-col bg-white"
      >
        <div className="flex justify-between p-2 shadow-lg">
          <p className={typographyStyle.h2}>Info</p>

          <button
            onClick={handleClose}
            className="bg-Secondary active:bg-Red group rounded p-2 transition-all"
          >
            <img
              className="transition-all group-hover:scale-125"
              src={closeIco}
              alt=""
            />
          </button>
        </div>

        <div
          className={`flex grow items-center justify-between px-2 ${typographyStyle.bodyText}`}
        >
          {message}
        </div>
      </div>
    </div>
  );
};
