import React, {useState, useContext} from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Nav from "./components/Nav";
import Articles from "./routes/Articles";
import Favorites from "./routes/Favorites";
import Preferences from "./routes/Preferences";
import MyContext from "./contexts/Contexts.js";
import SourceContext from "./contexts/SourceContext.js";

const App = () => {
  const [source, setSource] = useState(useContext(SourceContext).source);

  return (
    <div className="App">
    <Router>
      <Nav />
      <Switch>
        <SourceContext.Provider value={{source, setSource}}>
          <MyContext.Provider value={{articles:["articles1", "article2"]}}>
            <Route exact path="/" component={Articles} />
            <Route exact path="/favorites" component={Favorites} />
            <Route exact path="/preferences" component={Preferences} />
        </MyContext.Provider>
        </SourceContext.Provider>
      </Switch>
  </Router>
  </div>
  );
}

export default App;
