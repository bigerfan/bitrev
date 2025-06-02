import "./App.css";
import { Appcontainer } from "./components/Appcontainer";
import { Board } from "./components/board/Board";
import { MainForm } from "./components/crateBoard/mainForm";

function App() {
  return (
    <Appcontainer>
      <Board />
    </Appcontainer>
  );
}

export default App;
