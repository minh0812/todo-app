import Navbar from "./components/Navbar";
import ThemeToggle from "./components/ThemeToggle";
import Todos from "./components/Todos";
import ThemeContextProvider from "./contexts/ThemeContext";
function App() {
  return (
    <div className="App">
      <ThemeContextProvider>
        <Navbar />
        <Todos />
        <ThemeToggle />
      </ThemeContextProvider>
    </div>
  );
}

export default App;
