import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";

function App() {
  return (
    <div className="app-container">
      <Header />
      <Main />
      <Footer />
      <style jsx="true">{`
        .app-container {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          overflow: auto;
          background-color: #fff;
          max-width: 1200px;
          margin: auto;
        }
      `}</style>
    </div>
  );
}

export default App;
