import './App.css';
import {Route,Routes} from "react-router-dom"
import Home from './Pages/Home';
import { SocketProvider } from './Providers/Socket';
import { PeerProvider } from './Providers/Peer';
import Room from './Pages/Room';
function App() {
  
  return (
    <SocketProvider>
      <PeerProvider>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/room/:roomI" element={<Room />} />
          </Routes>
        </div>
      </PeerProvider>
    </SocketProvider>
  );
}

export default App;
