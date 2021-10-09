import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useDropdownExtended from "./DropdownHook";

const Gender = ({
  element_id,
  label_value,
  default_value,
  type,
}) => {
  const genders = useSelector(
    (state) => state.myAppReducer?.genderDropdown
  );

  const dispatch = useDispatch();

  const [genderId, GenderList] = useDropdownExtended({
    label: label_value,
    defaultState: default_value,
    options: genders,
    name: element_id,
  });

  useEffect(() => {
    dispatch({
      type: type,
      payload: Object.assign({}, { [element_id]: genderId }),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [genderId]);

  return <GenderList />;
};

export default Gender;
