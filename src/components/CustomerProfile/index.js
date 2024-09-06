import { Component } from "react";
import "./index.css";

class CustomerProfile extends Component {
  state = { userDetail: {}, userDeleted: false, deletedResponse: "" };

  componentDidMount() {
    this.getUserDetails();
  }

  deleteUser = async (userId) => {
    const url = `http://localhost:5000/users/${userId}/`;
    const options = {
      method: "DELETE",
    };
    await fetch(url, options);
    const { history } = this.props;
    history.replace("/");
  };

  getUserDetails = async () => {
    const { match } = this.props;
    const { params } = match;
    const { userId } = params;
    const url = `http://localhost:5000/users/${userId}/`;
    const options = {
      method: "GET",
    };
    const response = await fetch(url, options);
    if (response.ok) {
      const data = await response.json();
      const userData = {
        firstName: data.first_name,
        lastName: data.last_name,
        pinCode: data.pin_code,
        address: data.adress,
        mobileNo: data.mobile_no,
        userId: data.user_id,
        email: data.email,
      };
      this.setState({ userDetail: userData });
    }
  };

  delete = () => {
    const { userDetail } = this.state;
    const { userId } = userDetail;
    this.deleteUser(userId);
  };

  render() {
    const { userDetail, userDeleted, deletedResponse } = this.state;
    const {
      firstName,
      lastName,
      pinCode,
      address,
      mobileNo,
      email,
    } = userDetail;
    return (
      <div className="profile">
        {userDeleted && (
          <div className="profile">
            <h1>{deletedResponse}</h1>
          </div>
        )}
        {userDeleted === false && (
          <>
            <img
              className="image"
              src="https://i0.wp.com/vssmn.org/wp-content/uploads/2018/12/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png?fit=860%2C681&ssl=1"
              alt="profile"
            />
            <h1 className="full-name">{firstName + " " + lastName}</h1>
            <div>
              <button className="update" type="button">
                Update
              </button>
              <button onClick={this.delete} className="delete" type="button">
                Delete
              </button>
            </div>
            <div>
              <p>
                <span>Mobile: </span>
                {mobileNo}
              </p>
              <p>
                <span>Email: </span>
                {email}
              </p>
              <p>
                <span>Address: </span>
                {address}
              </p>
              <p>
                <span>Pincode: </span>
                {pinCode}
              </p>
            </div>
          </>
        )}
      </div>
    );
  }
}

export default CustomerProfile;
