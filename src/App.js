import React, { Component } from 'react';
import { Switch, Route, HashRouter as Router } from 'react-router-dom';
import './App.css';
import routes from './routes';
import firebase from 'firebase/app';
import 'firebase';

class App extends Component {

  conection = () => {
    var firebaseConfig = {
        apiKey: "AIzaSyAkqAUMx0aRcuvIiuhw_RSfmyUErVXL7_Y",
        authDomain: "ldc2104.firebaseapp.com",
        databaseURL: "https://ldc2104-default-rtdb.firebaseio.com",
        projectId: "ldc2104",
        storageBucket: "ldc2104.appspot.com",
        messagingSenderId: "943234505224",
        appId: "1:943234505224:web:006baff2a46d86b8800fbd",
        measurementId: "G-N7WFL6HTV3"
    };
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
        }else {
        firebase.app();
    }
}

componentDidMount() {
    this.conection();
}


  render() {
    return (
      <Router>
        {this.showContent(routes)}
      </Router>
    );
  }

  showContent = (routes) => {
    let result = null;
    if(routes.length > 0){
      result = routes.map((route, index) => {
        return(
            <Route
            key={index}
            path={route.path}
            exact={route.exact}
            component={route.main}
            />
        )
      });
    }
    return <Switch>{result}</Switch>
  }

}

export default App;
