import React, { useEffect, useState } from "react";
import { useSwipeable } from "react-swipeable";
import { ArrowButton } from "./ArrowButton";
import { Link } from "react-router-dom";

type BannerItem = {
  to: string;
  url: string;
};

type Props = {
  images: BannerItem[];
  itemWidth?: number;
  itemHeight?: number;
  gap?: number;
  step?: number;
  frameSize?: number;
  animationDuration?: number;
  infinite?: boolean;
};

const Carousel: React.FC<Props> = ({
  images,
  itemWidth = 130,
  itemHeight = 231,
  gap = 0,
  step = 1,
  frameSize = 1,
  animationDuration = 150,
  infinite = false,
}) => {
  const lastFramedIndex = images.length - frameSize;
  const [activeIndex, setActiveIndex] = useState(0);
  const [transformValue, setTransformValue] = useState(activeIndex * itemWidth);

  const updateIndex = (newIndex: number) => {
    let modifiedIndex = newIndex;

    if (newIndex < 0 && activeIndex > 0) {
      modifiedIndex = 0;
    } else if (newIndex < 0) {
      modifiedIndex = infinite ? lastFramedIndex : 0;
    } else if (newIndex >= lastFramedIndex && activeIndex < lastFramedIndex) {
      modifiedIndex = lastFramedIndex;
    } else if (newIndex >= lastFramedIndex) {
      modifiedIndex = infinite ? 0 : lastFramedIndex;
    }

    setActiveIndex(modifiedIndex);
  };

  const swipeLeft = () => {
    updateIndex(activeIndex + step);
  };

  const swipeRight = () => {
    updateIndex(activeIndex - step);
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => updateIndex(activeIndex + step),
    onSwipedRight: () => updateIndex(activeIndex - step),
  });

  useEffect(() => {
    const calc =
      activeIndex === 0
        ? activeIndex * itemWidth
        : activeIndex * itemWidth + gap * activeIndex;

    setTransformValue(calc);
  }, [activeIndex, gap, images.length, itemWidth]);

  return (
    <>
      <div className="col-span-full flex w-full justify-between">
        <ArrowButton onClick={swipeRight} direction="left" height="100%" />

        <div {...handlers} className="h-[400px] w-[1040px] overflow-hidden">
          <ul
            className="relative left-0 right-0 inline-flex w-[1040px]"
            style={{
              transitionDuration: `${animationDuration}ms`,
              transform: `translateX(-${transformValue}px)`,
            }}
          >
            {images.map((item, i) => {
              return (
                <li
                  className="inline-flex flex-shrink-0 flex-grow items-center justify-center transition-all"
                  key={i}
                >
                  <Link to={item.to}>
                    <img
                      className="scale-x-[-1] select-none object-cover"
                      style={{ width: itemWidth, height: itemHeight }}
                      src={item.url}
                      alt={item.to}
                      width={itemWidth}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <ArrowButton onClick={swipeLeft} direction="right" height="100%" />
      </div>
      
      <div className="col-span-full flex w-full justify-center gap-2">
        {images.map((_, i) => {
          return (
            <button
              onClick={() => setActiveIndex(i)}
              key={i}
              className="my-4 grid h-5 w-5 shrink-0 content-center justify-center"
            >
              <div
                className={` h-[4px] w-[14px] ${
                  i === activeIndex ? "bg-[#1A5A4C]" : "bg-[#E0E0E0]"
                }`}
              />
            </button>
          );
        })}
      </div>
    </>
  );
};

export default Carousel;
