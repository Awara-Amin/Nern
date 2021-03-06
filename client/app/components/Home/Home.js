import React, { Component } from 'react';
import 'whatwg-fetch';

import { 
  getFromStorage, 
  setInStorage,
} from '../../utils/storage';



class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      token: '',
      signUpError: '',
      signInError: '',
      signInEmail: '', 
      signInPassword: '',
      signUpFirstName: '', 
      signUpLastName: '', 
      signUpEmail:'', 
      signUpPassword: '',
      
    };
    this.onTextboxChangeSignInEmail = this.onTextboxChangeSignInEmail.bind(this);
    this.onTextboxChangeSignInPassword = this.onTextboxChangeSignInPassword.bind(this);
    this.onTextboxChangeSignUpEmail = this.onTextboxChangeSignUpEmail.bind(this);
    this.onTextboxChangeSignUpPassword = this.onTextboxChangeSignUpPassword.bind(this);
    this.onTextboxChangeSignUpFirstName = this.onTextboxChangeSignUpFirstName.bind(this);
    this.onTextboxChangeSignUpLastName = this.onTextboxChangeSignUpLastName.bind(this);

   this.onSignIn = this.onSignIn.bind(this);
   this.onSignUp = this.onSignUp.bind(this);
  }

  componentDidMount() {
    const token =getFromStorage('the_main_app');
    if(token) { 
      // Verify token
      fetch('/api/acount/verify?token=' + token) 
      .then(res => res.json())
      .then(json => {
        if(json.success){
          this.setState({
            token,
            isLoading:false
          });
        } else {
          this.setState({
            isLoading: false
          });
        }
      });

    } else { 
      this.setState({
        isLoading: false,
      });
    }
  }

    onTextboxChangeSignInEmail(event){
      this.setState({ 
        signInEmail: event.target.value,
      });
    }

    onTextboxChangeSignInPassword(event){
      this.setState({ 
        signInPassword: event.target.value,
      });
    }

    onTextboxChangeSignUpEmail(event){
      this.setState({ 
        signUpEmail: event.target.value,
      });
    }

    onTextboxChangeSignUpPassword(event){
      this.setState({ 
        signUpPassword: event.target.value,
      });
    }

    onTextboxChangeSignUpFirstName(event){
      this.setState({ 
        signUpFirstName: event.target.value,
      });
    }

    onTextboxChangeSignUpLastName(event){
      this.setState({ 
        signUpLastName: event.target.value,
      });
    }


    onSignUp(){
      // Grap state
      const { 
        signupFirstName,
        signUpLastName,
        signUpEmail,
        signUpPassword
      } = this.state;

      this.setState({ 
        isLoading: true,
      });


      
      // Post request to backend
      fetch('/api/account/signup', { 
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        firstName: signupFirstName,
        lasttName: signUpLastName,
        email: signUpEmail,
        password: signUpPassword,
      }),
     }).then(res => res.json())
      .then(json => {
        console.log('json', json)
        if(json.success){
          this.setState({
            signUpError: json.message,
            isLoading: false,
            signUpEmail: '', 
            signUpPassword: '', 
            signUpFirstName: '', 
            signUpLastName: '',
        });
        } else { 
          this.setState({
            signUpError: json.message,
            isLoading: false,
        });

        }
          
        

        });
     
    }

    onSignIn(){
      // Grap state
      const { 
        signupFirstName,
        signUpLastName,
        signUpEmail,
        signUpPassword
      } = this.state;

      this.setState({ 
        isLoading: true,
      });


      
      // Post request to backend
      fetch('/api/account/signup', { 
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        firstName: signupFirstName,
        lasttName: signUpLastName,
        email: signUpEmail,
        password: signUpPassword,
      }),
     }).then(res => res.json())
      .then(json => {
        console.log('json', json)
        if(json.success){
          this.setState({
            signUpError: json.message,
            isLoading: false,
            signInPassword:'', 
            signInEmail: '',

            
        });
        } else { 
          this.setState({
            signInError: json.message,
            isLoading: false,
        });

        }
          
        

        });
    }
    

  /*
    fetch('/api/counters', { method: 'POST' })
      .then(res => res.json())
      .then(json => {
        let data = this.state.counters;
        data.push(json);

        this.setState({
          counters: data
        });
      });
      */
  
  render() {
    const {
      isLoading,
      token,
      signInError, 
      signInEmail, 
      signInPassword,
      signUpFirstName, 
      signUpLastName, 
      signUpEmail, 
      signUpPassword,
      signUpError,
      

    } = this.state;
    if(isLoading){
      return(<div><p>Loading.....</p></div>);
    }

    if(!token){ 
      return (
        <div>
          {
            (signInError) ? (
              <p>{signInError}</p>
            ): (null)
          }
          {/* <p>Sign In</p> */}
          <div>
              <p>Sign In</p>
              <input 
              type='email' 
              placeholder='Email' 
              value={signInEmail}
              onChange={this.onTextboxChangeSignInEmail}

              /><br />
              <input 
                type='password' 
                placeholder='Password' 
                value={signInPassword}
                onChange={this.onTextboxChangeSignInPassword}

              />
              <br />
              <button onClick={this.onSignIn}> Sign In</button>
          </div>
          <br />
          <br />

          <div>
          {
            (signUpError) ? (
              <p>{signInError}</p>
            ): (null)
          }
              <p>Sign UP</p>
              <input 
              type='text' 
              placeholder='First Name' 
              value={signUpFirstName}
              onChange={this.onTextboxChangeSignUpFirstName}

              /><br />
              <input 
              type='text' 
              placeholder='Last Name'
              value={signUpLastName}
              onChange={this.onTextboxChangeSignUpLastName}

              /><br />
              <input 
              type='email' 
              placeholder='Email' 
              value={signUpEmail}
              onChange={this.onTextboxChangeSignUpEmail}

              /><br />
              <input 
              type='password' 
              placeholder='Password' 
              value={signUpPassword}
              onChange={this.onTextboxChangeSignUpPassword}

              /><br />
              <button onClick={this.onSignUp}> Sign Up</button>
          </div>

          {/* <p>Sign UP</p> */}
        </div>
      );
    }




    return (
      <div>
        <p>Account</p>
      </div>
    );
  }
}

export default Home;
