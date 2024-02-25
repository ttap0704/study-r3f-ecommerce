import { RecoilRoot } from "recoil";
import "./App.css";
import Home from "./components/Home";

function App() {
  return (
    <RecoilRoot>
      <Home />
    </RecoilRoot>
  );
}

export default App;
