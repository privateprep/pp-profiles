import logo from './logo.svg';

const Fallback = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p><strong>Good news:</strong> you've reached the profile site!</p>
        <p><strong>Bad news:</strong> you need a specific profile link.</p>
        <p>Contact our team for help!</p>
      </header>
    </div>
  )
}

export default Fallback;
