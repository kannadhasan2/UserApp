import { Link } from "react-router-dom";
import "./index.css";

const RenderUsers = (props) => {
  const { userList } = props;
  const { firstName, lastName, email, userId } = userList;
  const profileBackgroundColors = [
    "red",
    "pink",
    "purple",
    "deep-purple",
    "indigo",
    "blue",
    "light-blue",
    "cyan",
    "teal",
    "green",
    "light-green",
    "lime",
    "yellow",
    "amber",
    "orange",
    "deep-orange",
    "brown",
    "grey",
    "blue-grey",
    "light-grey",
  ];
  const randomIndex = Math.floor(
    Math.random() * profileBackgroundColors.length
  );
  const color = profileBackgroundColors[randomIndex];

  return (
    <li>
      <Link className="link user-container" to={`/users/${userId}`}>
        <div className={`initial ${color}`}>{firstName[0]}</div>
        <div>
          <h1 className="name">{firstName + " " + lastName}</h1>
          <p className="email">{email}</p>
        </div>
      </Link>
    </li>
  );
};

export default RenderUsers;
