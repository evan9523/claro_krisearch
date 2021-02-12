import React, { Fragment, useState } from "react";
import {
  Button,
  TextInput,
  Dimensions,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Platform,
} from "react-native";

import { winWidth } from "../utils/window";
import {
  SimpleLineIcons,
  Feather,
  Entypo,
  FontAwesome5,
  FontAwesome,
  AntDesign,
} from "@expo/vector-icons";
const DynForm = () => {
  const [inputFields, setInputFields] = useState([
    { firstName: "", lastName: "", date: "" },
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("inputFields", inputFields);
  };

  const handleInputChange = (index, event) => {
    const values = [...inputFields];
    if (event.target.name === "firstName") {
      values[index].firstName = event.target.value;
    } else if (event.target.name === "lastName") {
      values[index].lastName = event.target.value;
    } else {
      values[index].date = event.target.value;
    }

    setInputFields(values);
  };

  //   const handleAddFields = () => {
  //     const values = [...inputFields];
  //     values.push({ firstName: "", lastName: "" });
  //     setInputFields(values);
  //   };

  //   const handleRemoveFields = (index) => {
  //     const values = [...inputFields];
  //     values.splice(index, 1);
  //     setInputFields(values);
  //   };

  //   const handleInputChange = (index, event) => {
  //     const values = [...inputFields];
  //     if (event.target.name === "firstName") {
  //       values[index].firstName = event.target.value;
  //     } else {
  //       values[index].lastName = event.target.value;
  //     }

  //     setInputFields(values);
  //   };

  const handleAddFields = () => {
    const values = [...inputFields];
    values.push({ firstName: "", lastName: "", date: "" });
    setInputFields(values);
  };

  const handleRemoveFields = (index) => {
    const values = [...inputFields];
    values.splice(index, 1);
    setInputFields(values);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <View style={{ borderWidth: 2 }}>
          <div className="form-row">
            {inputFields.map((inputField, index) => (
              <Fragment key={`${inputField}~${index}`}>
                <View style={{ borderWidth: 1, borderColor: "red" }}>
                  <div
                    className="form-group col-sm-6"
                    style={{ backgroundColor: "red" }}
                  >
                    <label htmlFor="firstName">First Name</label>

                    <input
                      type="text"
                      className="form-control"
                      id="firstName"
                      name="firstName"
                      value={inputField.firstName}
                      onChange={(event) => handleInputChange(index, event)}
                    />
                  </div>
                  <div
                    className="form-group col-sm-4"
                    style={{ backgroundColor: "yellow" }}
                  >
                    <label htmlFor="lastName">Last Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="lastName"
                      name="lastName"
                      value={inputField.lastName}
                      onChange={(event) => handleInputChange(index, event)}
                    />
                  </div>
                  <div
                    className="form-group col-sm-4"
                    style={{ backgroundColor: "green" }}
                  >
                    <label htmlFor="date">Date</label>
                    <input
                      type="text"
                      className="form-control"
                      id="date"
                      name="date"
                      value={inputField.date}
                      onChange={(event) => handleInputChange(index, event)}
                    />
                  </div>
                  <div className="form-group col-sm-2">
                    <button
                      className="btn btn-link"
                      type="button"
                      onClick={() => handleRemoveFields(index)}
                    >
                      -
                    </button>
                    <button
                      className="btn btn-link"
                      type="button"
                      onClick={() => handleAddFields()}
                    >
                      +
                    </button>
                  </div>
                </View>
              </Fragment>
            ))}
          </div>
        </View>
        <div className="submit-button">
          <button
            className="btn btn-primary mr-2"
            type="submit"
            onSubmit={handleSubmit}
          >
            Save
          </button>
        </div>
        <br />
        <pre>{JSON.stringify(inputFields, null, 2)}</pre>
      </form>
    </>
  );
};

export default DynForm;
