import logo from "./logo.svg";
import "./App.css";
import Card from "./Components/Card/Card";
import ExcelReader from "./Components/ExcelReader/ExcelReader";

function App() {
  return (
    <div className="App">
      <ExcelReader />
      {/* <Card /> */}
    </div>
  );
}

export default App;
