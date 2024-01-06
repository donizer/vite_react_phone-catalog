/* eslint-disable max-len */
import { Link } from "react-router-dom";
import { typographyStyle } from "../CustomStyles/Typography";

import accessoryBanner from "../img/accessoryN.png";
import phoneBanner from "../img/phoneN.png";
import tabletBanner from "../img/tabletN.png";

export const ShopByCategory = () => {
  return (
    <>
      <h2 className={`col-span-6  ${typographyStyle.h1}`}>Shop by category</h2>

      <hr className="col-span-full h-[24px] border-0" />

      <div className="relative col-span-12 flex gap-x-4">
        <Link to="phones">
          <div className="group relative mb-6 h-[368px] w-[368px] overflow-hidden bg-[#FCDBC1] transition-all hover:bg-[#fcd3b3]">
            <img
              className="absolute left-60 top-40 scale-150 transition-all group-hover:left-52 group-hover:top-36"
              src={phoneBanner}
              alt=""
            />
          </div>
          <h3 className={`mb-1 ${typographyStyle.h3}`}>Mobile phones</h3>
          <p className={`text-Secondary ${typographyStyle.bodyText}`}>
            71 models
          </p>
        </Link>

        <Link to="tablets">
          <div className="group relative mb-6 h-[368px] w-[368px] overflow-hidden bg-[#8D8D92] transition-all hover:bg-[#9191a5]">
            <img
              className="absolute left-60 top-40 scale-150 transition-all group-hover:left-52 group-hover:top-36"
              src={tabletBanner}
              alt=""
            />
          </div>
          <h3 className={`mb-1 ${typographyStyle.h3}`}>Mobile phones</h3>
          <p className={`text-Secondary ${typographyStyle.bodyText}`}>
            24 models
          </p>
        </Link>

        <Link to="accessories">
          <div className="group relative mb-6 h-[368px] w-[368px] overflow-hidden bg-[#973D5F] transition-all hover:bg-[#aa3864]">
            <img
              className="absolute left-60 top-40 scale-150 transition-all group-hover:left-52 group-hover:top-36"
              src={accessoryBanner}
              alt=""
            />
          </div>
          <h3 className={`mb-1 ${typographyStyle.h3}`}>Mobile phones</h3>
          <p className={`text-Secondary ${typographyStyle.bodyText}`}>
            100 models
          </p>
        </Link>
      </div>
    </>
  );
};
