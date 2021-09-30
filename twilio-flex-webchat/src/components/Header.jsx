import logo from "../logo.svg";
import githubIcon from "./images/github-icon.svg";

function Header() {
  return (
    <header>
      <a href="https://daily.co" target="_blank" rel="noopener noreferrer">
        <img src={logo} alt="logo" />
      </a>
      <a href="https://github.com/daily-demos/chat-integrations">
        <img className="icon" src={githubIcon} alt="Demo repo on Github" />
      </a>
      <style jsx>{`
        header {
          padding: 2rem;
          display: flex;
          justify-content: space-between;
          align-items: baseline;
        }
      `}</style>
    </header>
  );
}

export default Header;
