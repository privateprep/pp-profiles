import fullLogo from "./full-logo.svg";

const Menu = () => (
  <header style={{ background:'#fff' }}>
    <div style={{ margin: '0 auto', maxWidth: 1080 }}>
      <a href="https://privateprep.com" style={{textDecoration: 'none!important', display: 'block'}}>
        <img src={fullLogo} alt="Private Prep Logo" style={{ width: 200, fill: "#274548"}} />
      </a>
    </div>
  </header>
)


export default Menu;
