import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import './App.css'

const WebItem = props => {
  const {uid, website, username, password, onDelReq, showPasswords} = props

  const webProfile = website[0]

  const onClickdelButton = () => {
    onDelReq(uid)
  }

  return (
    <li className="li">
      <p className="li-profile">{webProfile}</p>
      <div className="li-box">
        <p className="li-para">{website}</p>
        <p className="li-para">{username}</p>
        {showPasswords ? (
          <p className="li-para">{password}</p>
        ) : (
          <img
            className="stars"
            alt="stars"
            src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
          />
        )}
      </div>
      <button
        onClick={onClickdelButton}
        data-testid="delete"
        className="li-btn"
        type="button"
      >
        <img
          className="li-dlt-icon"
          alt="delete"
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
        />
      </button>
    </li>
  )
}

class App extends Component {
  state = {
    website: '',
    username: '',
    password: '',
    searcInput: '',
    showPasswords: false,
    websiteArray: [],
  }

  onWebsiteChange = event => {
    this.setState({website: event.target.value})
  }

  onUsernameChange = event => {
    this.setState({username: event.target.value})
  }

  onPasswordChange = event => {
    this.setState({password: event.target.value})
  }

  onSearchinputChange = event => {
    this.setState({searcInput: event.target.value})
  }

  onClickSubmit = event => {
    event.preventDefault()

    const {website, username, password} = this.state

    const newWebsiteObj = {
      id: uuidv4(),
      website,
      username,
      password,
    }

    this.setState(prevState => ({
      websiteArray: [...prevState.websiteArray, newWebsiteObj],
      website: '',
      username: '',
      password: '',
    }))
  }

  onDelReq = uid => {
    const {websiteArray} = this.state

    const changdArray = websiteArray.filter(eachWeb => eachWeb.id !== uid)

    this.setState({websiteArray: changdArray})
  }

  onClickShowPass = () => {
    const {showPasswords} = this.state

    this.setState({showPasswords: !showPasswords})
  }

  render() {
    const {
      website,
      username,
      password,
      searcInput,
      showPasswords,
      websiteArray,
    } = this.state

    const filteredWebArray = websiteArray.filter(eachWeb =>
      eachWeb.website
        .toLocaleLowerCase()
        .includes(searcInput.toLocaleLowerCase()),
    )

    return (
      <div className="bg">
        <img
          className="app-logo-img"
          alt="app logo"
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
        />
        <div className="card-1">
          <div className="form-container">
            <h1 className="form-head">Add New Password</h1>
            <form className="">
              <div className="form-input-container">
                <img
                  className="form-img"
                  alt="website"
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png "
                />
                <input
                  value={website}
                  onChange={this.onWebsiteChange}
                  className="input-form"
                  placeholder="Enter Website"
                  type="text"
                />
              </div>
              <div className="form-input-container">
                <img
                  className="form-img"
                  alt="username"
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png "
                />
                <input
                  value={username}
                  onChange={this.onUsernameChange}
                  className="input-form"
                  placeholder="Enter Username"
                  type="text"
                />
              </div>
              <div className="form-input-container">
                <img
                  className="form-img"
                  alt="password"
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png "
                />
                <input
                  value={password}
                  onChange={this.onPasswordChange}
                  className="input-form"
                  placeholder="Enter Password"
                  type="password"
                />
              </div>
              <div className="bt-container">
                <button
                  onClick={this.onClickSubmit}
                  className="SubBtn"
                  type="submit"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
          <img
            className="card-1-img "
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            alt="password manager"
          />
        </div>
        <div className="card-2">
          <div className="card-2-sec-1">
            <h1 className="card-2-head">
              Your Passwords{' '}
              <p className="card-2-head-span ">{filteredWebArray.length}</p>
            </h1>
            <div className="search-container">
              <img
                className="search-container-img"
                alt="search"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
              />
              <input
                value={searcInput}
                onChange={this.onSearchinputChange}
                className="search-input"
                placeholder="Search"
                type="search"
              />
            </div>
          </div>
          <hr className="line" />
          <div className="check-box-container">
            <input
              onChange={this.onClickShowPass}
              className="checkBox-input"
              id="showPasswords"
              type="checkbox"
              name="showPasswords"
              value="true"
            />
            <label htmlFor="showPasswords">Show Passwords</label>
          </div>

          {filteredWebArray.length === 0 ? (
            <div className="empty-container">
              <img
                className="no-p-Img"
                alt="no passwords"
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
              />
              <p className="empty-Note">No Passwords</p>
            </div>
          ) : (
            <ul className="ul">
              {filteredWebArray.map(eachWeb => (
                <WebItem
                  key={eachWeb.id}
                  uid={eachWeb.id}
                  website={eachWeb.website}
                  username={eachWeb.username}
                  password={eachWeb.password}
                  onDelReq={this.onDelReq}
                  showPasswords={showPasswords}
                />
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default App
