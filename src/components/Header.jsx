function Header({ darkMode, setDarkMode }) {
  return (
    <header className="header">

      <div className="logo">
        <span className="logo-icon">🖼️</span>
        <span>ImageResizer</span>
      </div>

      <nav className="navigation">

        <a href="#home">
          Home
        </a>

        <a href="#features">
          Features
        </a>

        <button
          className="theme-button"
          onClick={() => setDarkMode(!darkMode)}
          title="Toggle dark mode"
        >
          {darkMode ? "☀️" : "🌙"}
        </button>

      </nav>

    </header>
  );
}

export default Header;