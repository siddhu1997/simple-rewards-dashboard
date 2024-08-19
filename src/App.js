import Dashboard from "./Pages/Dashboard";
import { DarkThemeProvider } from "./Contexts/DarkThemeContext";

function App() {
  return (
    <div className="App">
      <DarkThemeProvider>
        <Dashboard />
      </DarkThemeProvider>
    </div>
  );
}

export default App;
