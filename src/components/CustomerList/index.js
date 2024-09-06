import { Component } from "react";
import { TailSpin } from "react-loader-spinner";
import RenderUsers from "../RenderUsers";
import "./index.css";

class CustomerList extends Component {
  state = { userList: [], isLoading: false, searchValue: "" };

  componentDidMount() {
    this.getUserDetails();
  }

  getSearch = (event) => {
    this.setState({ searchValue: event.target.value });
  };

  getUserDetails = async () => {
    this.setState({ isLoading: true });
    const url = "http://localhost:5000/users/";
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      const userDetails = data.map((eachUser) => ({
        firstName: eachUser.first_name,
        lastName: eachUser.last_name,
        mobileNo: eachUser.mobile_no,
        address: eachUser.adress,
        pinCode: eachUser.pin_code,
        email: eachUser.email,
        userId: eachUser.user_id,
      }));
      this.setState({ userList: userDetails, isLoading: false });
    }
  };

  render() {
    const { userList, isLoading, searchValue } = this.state;
    const filteredData = userList.filter(
      (each) =>
        each.firstName.includes(searchValue) ||
        each.lastName.includes(searchValue) ||
        each.address.includes(searchValue)
    );
    return (
      <div className="user-list-container">
        <h1 className="users">Users</h1>
        <input onChange={this.getSearch} className="search" type="search" />
        {isLoading && (
          <div className="loader">
            <TailSpin
              height="80"
              width="80"
              color="#0284c7"
              ariaLabel="tail-spin-loading"
              radius="1"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          </div>
        )}
        <ul className="ul-container">
          {filteredData.map((eachUser) => (
            <RenderUsers userList={eachUser} />
          ))}
        </ul>
      </div>
    );
  }
}

export default CustomerList;
