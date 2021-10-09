import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useDropdownExtended from "./DropdownHook";
import {
  GET_SYMPTOMS_OPTIONS,
  GET_SYMPTOMS_OPTIONS_FAILED,
} from "../../state/actions";
import { symptomsUrl } from "../../api-endpoints";
import { isEmptyArray } from "../../util/tools";
import { publicFetch } from "../../util/fetch";

const SymptomList = ({ element_id, label_value, default_value, type }) => {
  const symptoms = useSelector((state) => state.myAppReducer?.symptoms);

  const dispatch = useDispatch();

  const [symptomId, SymptomLists] = useDropdownExtended({
    label: label_value,
    defaultState: default_value,
    options: symptoms,
    name: element_id,
    dropdownOptionsType: "SYMPTOMS",
  });

  useEffect(() => {
    const res = getSymptoms();
    res.then((value) => {
      if (!isEmptyArray(value) && value?.length > 0) {
        dispatch({ type: GET_SYMPTOMS_OPTIONS, payload: value });
      } else {
        dispatch({ type: GET_SYMPTOMS_OPTIONS_FAILED, payload: value });
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getSymptoms = async () => {
    let resData = [];
    try {
      const { data } = await publicFetch.get(symptomsUrl);
      resData = data;
    } catch (err) {
      console.log("ERROR OCCURRED:::", err);
    }
    return resData;
  };

  useEffect(() => {
    dispatch({
      type: type,
      payload: Object.assign({}, { [element_id]: symptomId }),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [symptomId]);

  return <SymptomLists />;
};

export default SymptomList;
