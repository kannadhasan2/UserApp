import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import CustomerForm from "./components/CustomerForm";
import CustomerList from "./components/CustomerList";
import CustomerProfile from "./components/CustomerProfile";
import NavBar from "./components/NavBar";
import NotFound from "./components/NotFound";
import "./App.css";

const App = () => (
  <>
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route exact path="/" component={CustomerForm} />
        <Route exact path="/users/" component={CustomerList} />
        <Route exact path="/users/:userId" component={CustomerProfile} />
        <Route exact path="/bad-path" component={NotFound} />
        <Redirect to="/bad-path" />
      </Switch>
    </BrowserRouter>
  </>
);

export default App;
