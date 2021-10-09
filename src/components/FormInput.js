import React from "react";

const FormInput = ({ name, type, placeholder, default_value = "" , onChange}) => {
  return (
    <>
      {type === "textarea" ? (
        <textarea
          className="appearance-none rounded-none relative block w-full px-3 py-2 border border-input placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
          rows="3"
          spellCheck="false"
          value={default_value}
          onChange={onChange}
          name={name}
        ></textarea>
      ) : (
        <input
          type={type}
          name={name}
          id={name}
          value={type === "number" && default_value === "" ? "" : default_value}
          className="appearance-none rounded-none relative block w-full px-3 py-2 border border-input placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
          placeholder={placeholder}
          onChange={onChange}
        />
      )}
    </>
  );
};

export default FormInput;
