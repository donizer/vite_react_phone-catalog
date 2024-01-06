import { useSearchParams } from "react-router-dom";
import { ArrowButton } from "./ArrowButton";
import { PaginationButton } from "./PaginationButton";
import { scrollToTop } from "../utils/scrollToTop";

interface Props {
  totalPages: number;
  currentPage: number;
}

export const Pagintaion: React.FC<Props> = ({ totalPages, currentPage }) => {
  const [, setSearchParams] = useSearchParams();

  const pickPage = (newPage: number) => {
    if (currentPage === newPage) {
      return;
    }
    scrollToTop();

    setSearchParams((params) => {
      params.set("page", newPage.toString());

      return params;
    });
  };

  const nextPage = () => {
    setSearchParams((params) => {
      params.set("page", (currentPage + 1).toString());

      return params;
    });
    scrollToTop();
  };

  const prevPage = () => {
    setSearchParams((params) => {
      params.set("page", (currentPage - 1).toString());

      return params;
    });
    scrollToTop();
  };

  return (
    <div className="col-span-full flex justify-center gap-x-2">
      <ArrowButton
        onClick={prevPage}
        disabled={currentPage === 1}
        direction="left"
      />

      {Array.from({ length: totalPages }).map((_, i) => (
        <PaginationButton
          onClick={() => pickPage(i + 1)}
          active={currentPage === i + 1}
          key={i + 1}
        >
          {i + 1}
        </PaginationButton>
      ))}

      <ArrowButton
        onClick={nextPage}
        disabled={currentPage === totalPages}
        direction="right"
      />
    </div>
  );
};
