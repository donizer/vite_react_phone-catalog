import { Fragment, useMemo, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

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

export const Select: React.FC<Props> = ({
  options,
  sm,
  value,
  onChange,
  selectType,
}) => {
  const defaultOption = useMemo(() => {
    return options.find((e) => e.value === value) ?? options[0];
  }, [options, value]);
  const [selected, setSelected] = useState(defaultOption);

  const handleOnChange = (e: Option) => {
    onChange(selectType, e.value);
    setSelected(e);
  };

  return (
    <div className={`${!sm ? "w-44" : "w-32"}`}>
      <Listbox value={selected} onChange={handleOnChange}>
        <div className="relative mt-1">
          <Listbox.Button className="group relative w-full cursor-pointer border border-Elements bg-white py-2 pl-3 pr-10 text-left font-semibold transition-all hover:border-Primary">
            {({ open }) => (
              <>
                <span className="block truncate">{selected.label}</span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronDownIcon
                    className={`h-5 w-5 transition-all group-hover:text-Primary ${
                      open ? "rotate-180 text-Primary" : "text-Secondary"
                    }`}
                    aria-hidden="true"
                  />
                </span>
              </>
            )}
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options
              className="absolute mt-1 max-h-60 w-full overflow-auto border border-Elements bg-white py-2 text-base"
              static
            >
              {options.length &&
                options.map((option) => (
                  <Listbox.Option
                    key={option.value}
                    value={option}
                    className={({ selected, active }) =>
                      `group relative cursor-pointer select-none px-4 py-2 transition-all ${
                        selected || active
                          ? "font-semibold text-Primary"
                          : "text-Secondary"
                      }`
                    }
                  >
                    {option.label}
                  </Listbox.Option>
                ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};
