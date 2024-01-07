import * as Select from "@radix-ui/react-select";
import { useMemo, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import classNames from "classnames";
import { typographyStyle } from "../CustomStyles/Typography";

interface Option {
  value: string;
  label: string;
}

interface Props {
  options: Option[];
  onChange: (SelectType: string, newValue: string) => void;
  selectType: string;
  value?: string;
  sm?: boolean;
}

const RadixSelect: React.FC<Props> = ({
  options,
  sm,
  value,
  onChange,
  selectType,
}) => {
  const defaultOption = useMemo(() => {
    return options.find((e) => e.value === value)?.value ?? options[0].value;
  }, [options, value]);

  const [selected, setSelected] = useState(defaultOption);
  const [isOpen, setIsOpen] = useState(false);
  const toggleIsOpen = () => {
    setIsOpen((prev) => !prev);
  };

  const handleOnChange = (e: string) => {
    onChange(selectType, e);
    setSelected(e);
  };

  return (
    <Select.Root
      onOpenChange={toggleIsOpen}
      value={selected}
      onValueChange={handleOnChange}
    >
      <Select.Trigger
        className={classNames(
          "group relative flex h-10 cursor-pointer select-none border border-Elements bg-white px-2 py-2 text-left font-semibold outline-none transition-all hover:border-Primary",
          {
            "w-32": sm,
            "w-44": !sm,
            "border-Primary": isOpen,
          },
        )}
      >
        <Select.Value className="" />
        <Select.Icon className="absolute right-2 ">
          <ChevronDownIcon
            className={`h-5 w-5 transition-all group-hover:text-Primary ${
              isOpen ? "rotate-180 text-Primary" : "text-Secondary"
            }`}
            aria-hidden="true"
          />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content
          position="popper"
          className={classNames(
            `absolute left-0 border border-Elements bg-white py-2 text-base `,
            typographyStyle.smallText,
            {
              "w-32": sm,
              "w-44": !sm,
            },
          )}
        >
          <Select.Viewport>
            {options.map((option) => (
              <Select.Item
                key={option.value}
                value={option.value}
                className="flex h-8 cursor-pointer select-none items-center px-2 text-Secondary outline-none hover:text-Primary"
              >
                <Select.ItemText>{option.label}</Select.ItemText>
              </Select.Item>
            ))}
          </Select.Viewport>
          <Select.ScrollDownButton />
          <Select.Arrow />
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};

export default RadixSelect;
