import React, { useState } from "react";
import { useMemo } from "react";
import { isEmptyString, isNullOrUndefined, isObject } from "../../util/tools";
import Label from "./Label";

const useDropdownExtended = ({
  label = "",
  defaultState = "",
  options,
  name = "",
  dropdownOptionsType = "",
}) => {
  const [state, setState] = useState(defaultState);
  const [optionsArr, setOptionsArr] = useState(Object.assign([]));

  useMemo(() => {
    let listItem = [];
    let defEnable = false;

    if (
      isNullOrUndefined(dropdownOptionsType) ||
      isEmptyString(dropdownOptionsType)
    ) {
      defEnable = !isNullOrUndefined(options) && options?.length > 0;
      listItem =
        defEnable &&
        options?.map(({ id, label_value = "" }, index) => {
          let optionLabel = label_value;
          return defaultState === "" || isNullOrUndefined(defaultState) ? (
            <option key={id} value={id ?? ""}>
              {optionLabel}
            </option>
          ) : (
            <option key={id} selected={defaultState === id} value={id ?? ""}>
              {optionLabel}
            </option>
          );
        });
    } else if (dropdownOptionsType === "SYMPTOMS") {
      defEnable = !isNullOrUndefined(options) && options?.length > 0;
      listItem =
        defEnable &&
        options?.map(({ ID, Name ="" }, index) => {
          let optionLabel = Name;
          return defaultState === "" || isNullOrUndefined(defaultState) ? (
            <option key={ID} value={ID ?? ""}>
              {optionLabel}
            </option>
          ) : (
            <option key={ID} selected={defaultState === ID} value={ID ?? ""}>
              {optionLabel}
            </option>
          );
        });
    }

    setOptionsArr(listItem);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options]);

  const DropdownBuilder = () => (
    <div className="form-group" key={name}>
      <div className="d-flex justify-content-between">
        <Label text={label} />
      </div>

      <select
        className="appearance-none form-select block w-full
         mt-1 rounded-none relative placeholder-gray-500
         text-gray-900 rounded-md focus:outline-none 
         focus:shadow-outline-blue focus:border-blue-300 
         focus:z-10 sm:text-sm sm:leading-5
         p-2 border-input"
        id={name ?? label?.toLowerCase()}
        name={name ?? label?.toLowerCase()}
        onChange={(e) => {
          setState(e.target.value);
        }}
        onBlur={(e) => {
          setState(e.target.value);
        }}
        defaultValue={defaultState}
        key={name}
      >
        <option key="--Please choose--" value="">
          --Please choose--
        </option>
        {!isObject(optionsArr) ? optionsArr : []}
      </select>
    </div>
  );
  return [state, DropdownBuilder, setState];
};

export default useDropdownExtended;
