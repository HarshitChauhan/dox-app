import TextEditor from "./TextEditor";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import NotFound from "./NotFound";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Redirect to={`/documents/${uuidv4()}`} />
        </Route>
        <Route path="/documents/:id" exact>
          <TextEditor />
        </Route>
        <Route path="/404" exact>
          <NotFound />
        </Route>
        <Route>
          <Redirect to={"/404"} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
