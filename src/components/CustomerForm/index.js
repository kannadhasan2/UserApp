import { Component } from "react";
import { v4 as uuid } from "uuid";

import "./index.css";

class CustomerForm extends Component {
  state = {
    firstName: "",
    lastName: "",
    address: "",
    pinCode: "",
    mobileNo: "",
    email: "",
    userDetails: {},
    emailError: "",
    firstNameError: "",
    lastNameError: "",
    mobileNoError: "",
  };

  isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailRegex.test(email);
  };

  isValidName = (name) => {
    const nameRegex = /^[a-zA-Z\s]{2,50}$/;
    return nameRegex.test(name);
  };

  isValidMobileNumber = (mobileNumber) => {
    const mobileRegex = /^(\+?\d{1,4}[- ]?)?\d{10}$/;
    return mobileRegex.test(mobileNumber);
  };

  getFirstName = (event) => {
    this.setState({ firstName: event.target.value });
  };

  getLastName = (event) => {
    this.setState({ lastName: event.target.value });
  };

  getAddress = (event) => {
    this.setState({ address: event.target.value });
  };

  getEmail = (event) => {
    this.setState({ email: event.target.value });
  };

  getMobileNo = (event) => {
    this.setState({ mobileNo: event.target.value });
  };

  getPinCode = (event) => {
    this.setState({ pinCode: event.target.value });
  };

  addUsers = async () => {
    const { userDetails } = this.state;
    const url = "http://localhost:5000/users/";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDetails),
    };
    const response = await fetch(url, options);
    if (response.ok) {
      const data = await response.json();
      console.log(data);
    }
  };

  submitForm = (event) => {
    event.preventDefault();
    const {
      firstName,
      lastName,
      email,
      address,
      mobileNo,
      pinCode,
    } = this.state;
    let userDetails = {};
    if (
      this.isValidEmail(email) &&
      this.isValidName(firstName) &&
      this.isValidName(lastName)
    ) {
      userDetails = {
        email,
        firstName,
        lastName,
      };
    } else {
      this.setState({ emailError: "Invalid Email" });
    }
    if (this.isValidName(firstName)) {
      userDetails = {
        firstName,
      };
    } else {
      this.setState({ firstNameError: "Invalid Name" });
    }
    if (this.isValidName(lastName)) {
      userDetails = {
        lastName,
      };
    } else {
      this.setState({ lastNameError: "Invalid Name" });
    }
    if (this.isValidMobileNumber(mobileNo)) {
      userDetails = {
        mobileNo,
      };
    } else {
      this.setState({ mobileNoError: "Invalid Number" });
    }
    userDetails = {
      userId: uuid(),
      firstName,
      lastName,
      email,
      address,
      mobileNo,
      pinCode,
    };

    this.setState(
      {
        userDetails,
        firstName: "",
        lastName: "",
        address: "",
        pinCode: "",
        mobileNo: "",
        email: "",
      },
      this.addUsers
    );
  };

  render() {
    const {
      firstName,
      lastName,
      pinCode,
      address,
      mobileNo,
      email,
      emailError,
      lastNameError,
      firstNameError,
      mobileNoError,
    } = this.state;
    return (
      <div className="add-container">
        <div>
          <h1 className="heading">Add User Details</h1>
          <img
            src="https://res.cloudinary.com/dn6izpj6p/image/upload/v1725609738/1_ywxglw.jpg"
            alt="add profile"
          />
        </div>
        <form onSubmit={this.submitForm}>
          <label htmlFor="first" className="label">
            FIRST NAME
          </label>
          <br />
          <input
            id="first"
            onChange={this.getFirstName}
            value={firstName}
            type="text"
          />
          {firstNameError !== "" && <p className="error">*{firstNameError}</p>}
          <br />
          <label htmlFor="last" className="label">
            LAST NAME
          </label>
          <br />
          <input
            id="last"
            onChange={this.getLastName}
            value={lastName}
            type="text"
          />
          {lastNameError !== "" && <p className="error">*{lastNameError}</p>}
          <br />
          <label htmlFor="mobile" className="label">
            MOBILE NO
          </label>
          <br />
          <input
            id="mobile"
            onChange={this.getMobileNo}
            value={mobileNo}
            type="text"
          />
          {mobileNoError !== "" && <p className="error">*{mobileNoError}</p>}
          <br />
          <label htmlFor="email" className="label">
            EMAIL{" "}
          </label>
          <br />
          <input
            id="email"
            onChange={this.getEmail}
            value={email}
            type="text"
          />
          {emailError !== "" && <p className="error">*{emailError}</p>}
          <br />
          <label htmlFor="address" className="label">
            ADDRESS{" "}
          </label>
          <br />
          <input
            id="address"
            onChange={this.getAddress}
            value={address}
            type="text"
          />
          <br />
          <label htmlFor="pin" className="label">
            PIN CODE{" "}
          </label>
          <br />
          <input
            id="pin"
            onChange={this.getPinCode}
            value={pinCode}
            type="text"
          />
          <br />
          <button className="submit" type="submit">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default CustomerForm;
