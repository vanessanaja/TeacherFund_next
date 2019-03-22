import React, { Component } from 'react'
import TwoItemSwitcher from './twoItemSwitcher'
import * as Api from '../api/api'
import '../static/styles/main.scss'

class LoginForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      register: false,
      loginType: props.type || 'donor'
    }
  }

  setLocalState = (state) => {
    if (!state.error) state.error = ''
    if (!state.message) state.message = ''
    this.setState(state)
  }

  updateFirstname = (e) => {
    this.setLocalState({ firstName: e.target.value })
  }

  updateLastname = (e) => {
    this.setLocalState({ lastName: e.target.value })
  }

  updateEmail = (e) => {
    this.setLocalState({ email: e.target.value })
  }

  updateLoginType = (newVal) => {
    this.setLocalState({ loginType: newVal })
  }

  updateFormType = () => {
    this.setLocalState({ register: !this.state.register })
  }

  handleSubmit = () => {
    if (!this.state.register) {
      this.login()
    } else {
      this.signup()
    }
  }

  login = async () => {
    try {
      console.log('bal')
      const responseStream = await Api.login({
        email: this.state.email,
        role: this.state.loginType
      })
      const response = await responseStream.json()
      console.log(response)
      if (!response.ok) return this.showError()
      // succesful response, show "check email" message
      this.showCheckEmailMessage()
    } catch (e) {
      console.error(e)
    }
  }

  signup = async () => {
    try {
      const responseStream = await Api.register({
        email: this.state.email,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        role: this.state.loginType
      })
      const response = await responseStream.json()
      console.log(response)
      if (!response.ok) return this.showError()
      // succesful response, show "check email" message
      this.showCheckEmailMessage()
    } catch (e) {
      console.error(e)
    }
  }

  showError = () => {
    this.setLocalState({ error: 'An error occurred, please try again ' })
  }

  showCheckEmailMessage = () => {
    // Redirect to account
    this.setLocalState({ message: 'An auth email was sent to your email, use it to log in' })
  }

  render () {
    return (
      <div>
        <div className='heading'>
          <h2 className='h35 white'>Sign in</h2>
        </div>
        <div className='donorTeacherSwitcher'>
          <TwoItemSwitcher
            switchOneText="i'm a donor"
            className='donorTeacherSwitcher'
            color='white'
            selectedToggle={this.state.loginType === 'donor' ? 1 : 2}
            switchTwoText="i'm a teacher"
            switchOneClicked={() => this.updateLoginType('donor')}
            switchTwoClicked={() => this.updateLoginType('teacher')}
          />
        </div>
        <div>
          <div className='panel'>
            <div className='error'>
              <p className='error--message'>{this.state.error}</p>
            </div>
            <div className='instruction'>
              <p className='instruction--message'>{this.state.message}</p>
            </div>
            {this.state.register &&
            <div>
              <div className='input-wrapper'>
                <input
                  required='required'
                  className='name'
                  onChange={this.updateFirstname}
                  value={this.state.firstName}
                  aria-required='true'
                  placeholder='First name'
                  name='first name'
                  id='first_name'
                  autoComplete='off'
                />
              </div>
              <div className='input-wrapper'>
                <input
                  required='required'
                  className='name'
                  onChange={this.updateLastname}
                  value={this.state.lastName}
                  aria-required='true'
                  placeholder='Last name'
                  name='last name'
                  id='last_name'
                  autoComplete='off'
                />
              </div>
            </div>}
            <div className='input-wrapper'>
              <input
                required='required'
                className='email'
                onChange={this.updateEmail}
                value={this.state.email}
                aria-required='true'
                placeholder='Email'
                type='email'
                name='email'
                id='user_email'
                autoComplete='off'
              />
            </div>
            <div className='button button--large button--expand radius' onClick={this.handleSubmit}>
              <label className='ttu'>{this.state.register ? 'Sign up' : 'Sign in'}</label>
            </div>
            <a className='reset' onClick={this.updateFormType}>{this.state.register ? 'or sign in' : 'or sign up'}</a> <br />
            {!this.state.register && <a className='reset' href='/account/password/reset'>Forgot password?</a>}
          </div>
        </div>
      </div>
    )
  }
}

export default LoginForm
