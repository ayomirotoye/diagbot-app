import React, { useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../components/common/Card";
import FormSuccess from "../components/FormSuccess";
import FormError from "../components/FormError";
import GradientBar from "../components/common/GradientBar";
import { AuthContext } from "../context/AuthContext";
import { publicFetch } from "../util/fetch";
import GradientButton from "../components/common/GradientButton";
import logo from "./../images/logo.png";
import SymptomList from "../components/common/SymptomList";
import Gender from "../components/common/Gender";
import FormInput from "../components/FormInput";
import Label from "../components/common/Label";
import { SET_DIAGNOSIS_DATA } from "../state/actions";
import { validationMsg } from "../util/validation-messages";
import { diagnosisUrl } from "../api-endpoints";
import { setDiagnosisData } from "../state/reducers/my-app-reducer";

const GetDiagnosis = () => {
  const dispatch = useDispatch();
  const [isSubmittng, setIsSubmitting] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState({
    value: false,
    message: "",
    data: [],
  });

  const currentData = useSelector((state) => state.myAppReducer?.diagnosisData);

  const getDiagnosis = async () => {
    try {
      setIsSubmitting(true);
      const { data } = await publicFetch.post(diagnosisUrl, currentData);
      if (data && data.length > 0) {
        setIsSuccessful({
          value: true,
          message: "Successful",
        });
      }
    } catch (error) {
      console.log("ERROR OCCURRED:::", error);
      setIsSuccessful({
        value: false,
        message: error.message.indexOf("400")
          ? validationMsg.BAD_REQUEST
          : "Error occurred",
        data: error.response.data,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    dispatch(setDiagnosisData({ [e.target.name]: e.target.value }));
  };

  return (
    <>
      <section className="w-full sm:w-1/2 h-screen m-auto p-8 sm:pt-10">
        <GradientBar />
        <Card>
          <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full">
              <div>
                <div className="w-32 m-auto mb-6">
                  <img src={logo} alt="Logo" />
                </div>
                <h2 className="mb-2 text-center text-3xl leading-9 font-extrabold text-gray-900">
                  Get diagnosed
                </h2>
                <p className="text-gray-600 text-center">
                  kindly let us know how you are feeling
                </p>
              </div>

              <form className="mt-8">
                {isSuccessful.value && (
                  <FormSuccess text={isSuccessful.message} />
                )}
                {!isSuccessful.value && isSuccessful.message.length > 0 && (
                  <FormError text={isSuccessful.message} />
                )}
                <div>
                  <div className="mb-2">
                    <SymptomList
                      element_id="symptomId"
                      label_value="Symptoms"
                      default_value={currentData.symptomId}
                      type={SET_DIAGNOSIS_DATA}
                    />
                  </div>
                  <div className="mb-2">
                    <div className="mb-1">
                      <Label text="Selected symptoms" />
                    </div>
                    <FormInput
                      ariaLabel="selectedSymptoms"
                      name="selectedSymptoms"
                      type="textarea"
                      default_value={currentData.selectedSymptoms}
                      onChange={handleInputChange}
                      placeholder="selectedSymptoms"
                    />
                  </div>
                  <div className="mb-2">
                    <Gender
                      element_id="gender"
                      label_value="Gender"
                      default_value={currentData.gender}
                      type={SET_DIAGNOSIS_DATA}
                    />
                  </div>
                  <div className="mb-2">
                    <div className="mb-1">
                      <Label text="Year of birth" />
                    </div>
                    <FormInput
                      ariaLabel="Year of birth"
                      name="yearOfBirth"
                      type="number"
                      placeholder="Year of birth"
                      default_value={currentData.yearOfBirth}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="mt-6">
                  <GradientButton
                    type="button"
                    text="Submit"
                    onClick={getDiagnosis}
                    loading={isSubmittng}
                    isDisabled={isSubmittng}
                  />
                </div>
              </form>
            </div>
          </div>
        </Card>
      </section>
    </>
  );
};

export default GetDiagnosis;
