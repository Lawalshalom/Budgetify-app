import React, { useEffect, useState } from "react";
import { Route, Switch } from 'react-router-dom';
import AOS from "aos";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Login from "./Pages/Login";
import Privacy from "./Pages/Privacy";
import Contact from "./Pages/Contact";
import Budget from "./Pages/Budget";
import Profile from "./Pages/Profile";
import Signup from "./Pages/Signup";
import Error from "./Error";
import "./app.css";


  const App = () => {
    const [budgetData, setBudgetData] = useState([]);
    const [user, setUser] = useState(null);
    const updateData = (data) => {
      setBudgetData(data.response);
    };

    const updateUser = (data) => {
      setUser(data);
    };

    useEffect(() => {

      AOS.init({
        offset: 20, // offset (in px) from the original trigger point
        delay: 0, // values from 0 to 3000, with step 50ms
        duration: 1000, // values from 0 to 3000, with step 50ms
        easing: 'ease-in', // default easing for AOS animations
        once: true, // whether animation should happen only once - while scrolling down
        mirror: false, // whether elements should animate out while scrolling past them
        anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation

      });
    })
    return (
      <main>
          <Switch>
              <Route path="/" render={renderprops =><Home {...renderprops} />} exact />
              <Route path="/about" render={renderprops => <About {...renderprops} />} />
              <Route path="/signup" render={renderprops => <Signup {...renderprops} />} />
              <Route path="/login" render={renderprops =>
                <Login updateData={updateData} budgetData={budgetData} user={user} updateUser={updateUser} {...renderprops} />} />
              <Route path="/profile" render={renderprops =>
                <Profile updateData={updateData} budgetData={budgetData} user={user} {...renderprops} />} />
              <Route path="/privacy" render={renderprops =>
                <Privacy updateData={updateData} budgetData={budgetData} {...renderprops} />} />
              <Route path="/contact" render={renderprops => <Contact {...renderprops} />} />
              <Route path="/budget" render={renderprops => <Budget {...renderprops} user={user}/>} />
              <Route render={renderprops => <Error {...renderprops} />} />
          </Switch>
      </main>
    )
  }
  export default App;