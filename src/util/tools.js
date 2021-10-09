


export const isObject = (item) => {
  return typeof item === "object" && !Array.isArray(item) && item !== null;
};

export const skipObject = (arrOfVals, objVal) => {
  let newObj = {};
  if (arrOfVals.length === 0) {
    for (const [keys, values] of Object.entries(objVal)) {
      newObj = Object.assign({}, newObj, {
        [keys]: values,
      });
    }
    return newObj;
  } else {
    for (const [keys, values] of Object.entries(objVal)) {
      if (!arrOfVals.includes(keys)) {
        newObj = Object.assign({}, newObj, {
          [keys]: values,
        });
      }
    }
    return newObj;
  }
};

export const cherryPickObject = (arrOfVals, objVal) => {
  let newObj = {};
  for (const [keys, values] of Object.entries(objVal)) {
    if (arrOfVals.includes(keys)) {
      newObj = Object.assign({}, newObj, {
        [keys]: values,
      });
    }
  }
  return newObj;
};

export const hasKeys = (objVal) => {
  return !isNullOrUndefined(objVal) && Object.entries(objVal).length > 0;
};
export const isKeyPresent = (objVal, requiredKey) => {
  return !isNullOrUndefined(objVal) && objVal[requiredKey];
};

export const createUUID = (prefix) => {
  return (
    prefix +
    (new Date().getTime().toString(16) +
      Math.floor(1e7 * Math.random()).toString(16))
  );
};

export const checkValueOrElseUseDefinedVal = (
  val,
  definedString
) => {
  return val !== null && val !== undefined ? val : definedString;
};

export const isEmptyString = (val) => {
  return val === null || val === undefined || val.length === 0;
};

export const isANumber = (val) => {
  return val !== null && val !== undefined && !Number.isNaN(val);
};

export const valueIsLessThan = (val, operand) => {
  return isANumber(val) && val < operand;
};

export const valueIsGreaterThan = (val, operand) => {
  return isANumber(val) && val > operand;
};

export const isEmptyArray = (val) => {
  return val === null || val === undefined || val.length === 0;
};

export const isNullOrUndefined = (val) => {
  return val === null || val === undefined;
};

export const trueOrFalse = (val) => {
  return checkValueOrElseUseDefinedVal(val, "") !== "" &&
    val !== null &&
    val?.toString().toLowerCase() === "true"
    ? true
    : val.toString().toLowerCase() === "false"
    ? false
    : val;
};

export const isYesOrNo = (val) => {
  return checkValueOrElseUseDefinedVal(val, "") !== "" &&
    trueOrFalse(val) === false
    ? "No"
    : trueOrFalse(val) === true
    ? "Yes"
    : val;
};

export const parseResponse = (val, fallbackRes) => {
  if (checkValueOrElseUseDefinedVal(val, "") !== "") {
    let resMessage = checkValueOrElseUseDefinedVal(
      val?.actionResponse?.message,
      fallbackRes
    );

    return resMessage;
  } else {
    return fallbackRes;
  }
};

export const isSuccessful = (val) => {
  return (
    (val !== null && val !== undefined && val === "00") ||
    val === true ||
    String(val).toLowerCase() === "successful"
  );
};
export const isDeclined = (val) => {
  return (
    (val !== null && val !== undefined && val === "05") ||
    val === true ||
    String(val).toLowerCase() === "successful"
  );
};

export const splitString = (val, regexp) => {
  let res = "";
  if (!isEmptyString(val)) {
    res = val.split(regexp).join(" ");
  }
  return res;
};
export const splitObject = (val) => {
  let res = "";
  for (const [, value] of Object.entries(val)) {
    res += String(value).concat("<br/>");
  }
  return res;
};

export const camelCaseToSentenceCase = (val) => {
  let res = "";
  try {
    if (!isEmptyString(val)) {
      res = val.replace(/([a-zA-Z])(?=[A-Z])/g, "$1 ");
    }
  } catch (error) {
    console.log("ERROR OCCURRED WHILE PARSING:::", error);
  }

  return capitaliseFirstLetter(res);
};

export const upperCaseCharAt = (val, loc) => {
  let res = val;
  if (!isEmptyString(val)) {
    res = val.length > 0 ? val.charAt(loc).toUpperCase() : val;
  }
  return res;
};
export const capitaliseFirstLetter = (val) => {
  let res = val;
  if (!isEmptyString(val)) {
    res = val.length > 0 ? val.charAt(0).toUpperCase() + val.slice(1) : val;
  }
  return res;
};

export const makeTitleCase = (stringInContext) => {
  let titleSentence = stringInContext.toLowerCase().split(" ");
  for (let i = 0; i < titleSentence.length; i++) {
    titleSentence[i] =
      titleSentence[i][0].toUpperCase() + titleSentence[i].slice(1) + " ";
  }
  return titleSentence;
};

export const makeSentenceCase = (val) => {
  let res = val;
  if (!isEmptyString(val)) {
    res = val.length > 0 ? val.charAt(0).toUpperCase() + val.slice(1) : val;
  }
  return res;
};

export const getSessionId = () => {
  return /SESS\w*ID=([^;]+)/i.test(document.cookie) ? RegExp.$1 : false;
};

export const useGoBack = () => {};

export const wait = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const grouper = (key) => (array) =>
  array.reduce((objectsByKeyValue, obj) => {
    const value = obj[key];
    objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
    return objectsByKeyValue;
  }, {});

export const groupByHelper = grouper("parentMenuName");
export const stringStripper = ({
  stringInContext,
  replacer,
  replacee,
}) => {
  let stringAfterReplacement = "";
  try {
    stringAfterReplacement = stringInContext.replaceAll(
      replacee ?? "",
      replacer === "" ? "" : replacer
    );
  } catch (error) {
    stringAfterReplacement = stringInContext;
  }
  return stringAfterReplacement;
};

export const buildDateRangeString = (data) => {
  return data.startDate.concat(
    "/",
    data?.endDate,
    "/",
    data?.requestTypeId === "APPROVED" ? 1 : 0
  );
};

export const sanitizeUrl = (data) => {
  return data.startsWith("/") ? data.substr(1) : data;
};

export const getToday = () => {
  let myDate = new Date();
  let year = String(myDate.getFullYear());
  let month =
    myDate.getMonth() < 10 ? "0" + myDate.getMonth() : myDate.getMonth();
  let day = myDate.getDay() < 10 ? "0" + myDate.getDay() : myDate.getDay();

  let finalDate = String(month + day + year);
  return finalDate;
};

export const stringSplitter = (splitBy, stringToSplit) => {
  try {
    let splittedString = stringToSplit.trim().split(splitBy);
    let splittedStringArr = splittedString.join(" ");

    return splittedStringArr;
  } catch (error) {
    return stringToSplit;
  }
};
