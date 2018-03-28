import React, { Component } from 'react';
import * as firebase from "firebase";

import { firebase as firebaseConfig } from './config';
import logo from './logo.svg';
import './App.css';

const datatest = {
      userId: 0,
      username: 'Panupong',
      email: 'Panupong@test.com',
      profile_picture : 'https://firebase.google.com/images/social.png'
}

class App extends Component {
  state = {
    data: ''
  }
  async componentWillMount() {
    const { userId, username, email, profile_picture } = datatest; 
    await firebase.initializeApp(firebaseConfig.config);
    const db = await firebase.database();
    console.log('Showdatabase APP', db);
    await this.getUserData(userId);
    // await this.writeUserData(userId, username, email, profile_picture);
  }

  getUserData(userId) {
    return firebase.database().ref(`/users`).once('value').then((snapshot) => {
      this.setState({ data:{
        user:snapshot.val()
      }
    });
      // const username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
      // const email = (snapshot.val() && snapshot.val().email) || 'Anonymous';
      // const profile_picture = (snapshot.val() && snapshot.val().profile_picture) || 'Anonymous';
      // this.setState({ username, email, profile_picture })
    });
  }

  writeUserData(userId, name, email, imageUrl) {
    firebase.database().ref('users/' + userId).set({
      username: name,
      email: email,
      profile_picture : imageUrl
    });
  }

  renderDataList(data) {
    let count = 0;
    return data.map(user => {
      count++;
      return (
          <tr key={count}>
            <td>{user.username}</td>
            <td>{user.email}</td> 
            <td><img src={user.profile_picture} alt="Smiley face" height="80" width="80" /></td>
          </tr>
      );
    });
  }

  Table(data) {
    return (
      <table>
        <tr>
          <th>Username</th>
          <th>Email</th>
          <th>picture</th>
        </tr>
        {this.renderDataList(data)}
      </table>
    );
  }

  render() {
    const { data} = this.state;
    console.log(data);
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        {(data.user) ? this.Table(data.user) : ''}
      </div>
    );
  }
}

export default App;
