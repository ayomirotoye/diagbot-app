import {
    GET_GENDER_OPTIONS,
    GET_SYMPTOMS_OPTIONS,
    SET_DIAGNOSIS_DATA,
} from "../actions";

const initialState = {
    genderDropdown: [
        { id: "MALE", name: "Male", label_value: "Male" },
        { id: "FEMALE", name: "Female", label_value: "Female" },
    ],
    symptoms: [],
    diagnosisData: {
        symptomId: "",
        gender: "",
        yearOfBirth: "",
        selectedSymptoms: []
    },
};

export const setDiagnosisData = (data) => (dispatch) => {
    dispatch({ type: SET_DIAGNOSIS_DATA, payload: data });
};


const myAppReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_GENDER_OPTIONS:
            return state;
        case GET_SYMPTOMS_OPTIONS:
            return {...state, symptoms: action.payload };
        case SET_DIAGNOSIS_DATA:
            let newState = Object.assign({}, state.diagnosisData, action.payload);

            newState = Object.assign({},
                newState, { symptoms: state.diagnosisData.selectedSymptoms.push(state.symptoms.filter(x => x.ID === state.diagnosisData.symptomId)) });
            return {...state, diagnosisData: newState };
        default:
            return state;
    }
};

export default myAppReducer;