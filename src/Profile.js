import logo from './logo.svg';
import { useParams } from "react-router-dom"

const Profile = () => {
  const {uuid} = useParams();

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Hello {uuid}
        </p>
      </header>
    </div>
)}

export default Profile
