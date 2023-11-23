/* eslint-disable max-len */
import { useContext } from "react";
import { Outlet, Link, useParams } from "react-router-dom";
import { GridContainer } from "./Components/GridContainer";
import { typographyStyle } from "./CustomStyles/Typography";
import { StylishNavButton } from "./Components/StylishNavButton";
import { ArrowButton } from "./Components/ArrowButton";
import { scrollToTop } from "./utils/scrollToTop";
import { appContext } from "./Contexts/AppContext";

import logo from "./assets/Icons/Logo.svg";
import favoritesIco from "./assets/Icons/Favourites.svg";
import cartIco from "./assets/Icons/Cart.svg";
import searchIco from "./assets/Icons/Search.svg";
import { Modal } from "./Components/Modal";

const App = () => {
  const {
    favorites,
    cartItems,
    searchParams,
    setSearchParams,
    modalInfo,
    setModalInfo,
  } = useContext(appContext);
  const { catalogueId, itemId } = useParams();
  const searchQuery = searchParams.get("query") || "";

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams((params) => {
      if (event.target.value) {
        params.set("query", event.target.value);
      } else {
        params.delete("query");
      }

      return params;
    });
  };

  const getTotalCartItem = () => {
    return cartItems.reduce((prev, acc) => prev + acc.quantity, 0);
  };

  return (
    <>
      <GridContainer>
        <div className="border-Elements relative z-20 col-span-full flex h-16 items-center border-b-[1px] bg-white">
          <Link to="/" className="ml-6 mr-16">
            <img className="h-16 w-10" src={logo} alt="" />
          </Link>

          <div className="flex w-full justify-between">
            <nav
              className={`flex items-center gap-16 ${typographyStyle.uppercase}`}
            >
              <StylishNavButton to="/">home</StylishNavButton>

              <StylishNavButton to="catalogue/phones">phones</StylishNavButton>

              <StylishNavButton to="catalogue/tablets">
                tablets
              </StylishNavButton>

              <StylishNavButton to="catalogue/accessories">
                accessories
              </StylishNavButton>
            </nav>

            <div className="flex justify-self-end">
              {catalogueId && !itemId && (
                <div className="border-Elements flex h-full w-80 items-center border border-r-0 px-6 ">
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
                counter={getTotalCartItem()}
                to="cart"
                imgUrl={cartIco}
              />
            </div>
          </div>
        </div>

        <div className="relative col-span-12 col-start-2 grid auto-rows-min grid-cols-12 gap-x-4">
          <Outlet />
        </div>

        <div className="text-Secondary col-span-12 col-start-2 flex h-[96px] items-center justify-between">
          <Link to="/" className="flex h-full items-center">
            <img className="h-full w-10" src={logo} alt="" />
          </Link>

          <nav
            className={`flex h-full items-center gap-x-16 ${typographyStyle.uppercase}`}
          >
            <a
              className="hover:text-Primary flex h-[96px]  items-center transition-all"
              href="https://github.com/donizer/vite_react_phone-catalog/"
              target="_blank"
              rel="noreferrer"
            >
              github
            </a>
            <a
              className="hover:text-Primary flex h-[96px]  items-center transition-all"
              href="#contacts"
              onClick={(e) => e.preventDefault()}
            >
              contacts
            </a>
            <a
              className="hover:text-Primary flex h-[96px]  items-center transition-all"
              href="#rights"
              onClick={(e) => e.preventDefault()}
            >
              rights
            </a>
          </nav>

          <div className="font-Mont flex h-full items-center gap-x-4 text-[12px] font-semibold">
            <label
              className="hover:text-Primary transition-all hover:cursor-pointer"
              htmlFor="to-top"
            >
              Back to top:
            </label>
            <ArrowButton id="to-top" direction="up" onClick={scrollToTop} />
          </div>
        </div>
      </GridContainer>

      {modalInfo && <Modal onClick={setModalInfo} message={modalInfo} />}
    </>
  );
};

export default App;
