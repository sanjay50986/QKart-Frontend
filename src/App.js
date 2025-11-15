import Register from "./components/Register";
import ipConfig from "./ipConfig.json";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Login from "./components/Login";
import Products from "./components/Products";
import Checkout from "./components/Checkout";
import Thanks from "./components/Thanks"

export const config = {
  endpoint: `http://${ipConfig.workspaceIp}:8082/api/v1`,
};

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/"><Products/></Route>
        <Route exact path="/login"><Login/></Route>
        <Route exact path="/register"><Register/></Route>
        <Route exact path="/checkout"><Checkout/></Route> 
        <Route exact path="/thanks"><Thanks/></Route> 

      </Switch>
    </BrowserRouter>
  );
}

export default App;
