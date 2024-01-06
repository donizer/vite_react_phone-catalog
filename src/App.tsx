import { useCallback } from "react";

import { Link, Outlet, useParams, useSearchParams } from "react-router-dom";
import { scrollToTop } from "./utils/scrollToTop";
import { typographyStyle } from "./CustomStyles/Typography";

import { ArrowButton } from "./Components/ArrowButton";
import { GridContainer } from "./Components/GridContainer";
import { StylishNavButton } from "./Components/StylishNavButton";
// import { Modal } from "./Components/Modal";

import { useAppSelector } from "./app/hooks";

import cartIco from "./assets/Icons/Cart.svg";
import favoritesIco from "./assets/Icons/Favourites.svg";
import logo from "./assets/Icons/Logo.svg";
import searchIco from "./assets/Icons/Search.svg";


export const App = () => {
  const { favorites } = useAppSelector((state) => state.favorites);
  const { cart } = useAppSelector((state) => state.cart);
  const { catalogueId, itemId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const searchQuery = searchParams.get("query") ?? "";

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchParams((params) => {
        if (event.target.value) {
          params.set("query", event.target.value);
        } else {
          params.delete("query");
        }

        return params;
      });
    },
    [setSearchParams],
  );

  return (
    <>
      <GridContainer>
        <div className="relative z-20 col-span-full flex h-16 items-center border-b-[1px] border-Elements bg-white">
          <Link to="/" className="ml-6 mr-16">
            <img className="h-16 w-10" src={logo} alt="" />
          </Link>

          <div className="flex w-full justify-between">
            <nav
              className={`flex items-center gap-16 ${typographyStyle.uppercase}`}
            >
              <StylishNavButton to="/">home</StylishNavButton>

              <StylishNavButton to="phones">phones</StylishNavButton>

              <StylishNavButton to="tablets">tablets</StylishNavButton>

              <StylishNavButton to="accessories">accessories</StylishNavButton>
            </nav>

            <div className="flex justify-self-end">
              {catalogueId && !itemId && (
                <div className="flex h-full w-80 items-center border border-r-0 border-Elements px-6 ">
                  <input
                    value={searchQuery}
                    onChange={handleInputChange}
                    className={`h-full w-80 outline-none ${typographyStyle.button}`}
                    placeholder={`Search in ${catalogueId}...`}
                    type="text"
                  />
                  <img className="h-4 w-4" src={searchIco} alt="" />
                </div>
              )}

              <StylishNavButton
                counter={favorites.length}
                to="favourites"
                imgUrl={favoritesIco}
              />

              <StylishNavButton
                counter={cart.length}
                to="cart"
                imgUrl={cartIco}
              />
            </div>
          </div>
        </div>

        <div className="relative col-span-12 col-start-2 grid auto-rows-min grid-cols-12 gap-x-4">
          <Outlet />
        </div>

        <div className="col-span-12 col-start-2 flex h-[96px] items-center justify-between text-Secondary">
          <Link to="/" className="flex h-full items-center">
            <img className="h-full w-10" src={logo} alt="" />
          </Link>

          <nav
            className={`flex h-full items-center gap-x-16 ${typographyStyle.uppercase}`}
          >
            <a
              className="flex h-[96px] items-center  transition-all hover:text-Primary"
              href="https://github.com/donizer/vite_react_phone-catalog/"
              target="_blank"
              rel="noreferrer"
            >
              github
            </a>
            <a
              className="flex h-[96px] items-center  transition-all hover:text-Primary"
              href="#contacts"
              onClick={(e) => e.preventDefault()}
            >
              contacts
            </a>
            <a
              className="flex h-[96px] items-center  transition-all hover:text-Primary"
              href="#rights"
              onClick={(e) => e.preventDefault()}
            >
              rights
            </a>
          </nav>

          <div className="flex h-full items-center gap-x-4 font-Mont text-[12px] font-semibold">
            <label
              className="transition-all hover:cursor-pointer hover:text-Primary"
              htmlFor="to-top"
            >
              Back to top:
            </label>
            <ArrowButton id="to-top" direction="up" onClick={scrollToTop} />
          </div>
        </div>
      </GridContainer>

      {/* {modalInfo && <Modal onClick={setModalInfo} message={modalInfo} />} */}
    </>
  );
};
