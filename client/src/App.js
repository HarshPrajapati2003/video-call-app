import './App.css';
import {Route,Routes} from "react-router-dom"
import Home from './Pages/Home';
import { SocketProvider } from './Providers/Socket';
function App() {
  return (
    <SocketProvider>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/room/:roomI" element={<h1>Hello 1</h1>} />
        </Routes>
      </div>
    </SocketProvider>
  );
}

export default App;
