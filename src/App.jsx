import {Route,Routes} from 'react-router-dom';
import Navbar from '../src/component/navbar/Navbar';
import Login from '../src/component/login/Login';
import Dashboard from '../src/component/dashboard/Dashboard';
import Home from '../src/component/home/Home';
import ProtectiveRoute from '../src/component/protectiveRoute/protectiveRoute'

function App() {
  return (
      <>
          <Navbar />
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={<ProtectiveRoute />}>
                <Route path="/dashboard" element={<Dashboard />} />
              </Route>
          </Routes>
      </>
  );
}

export default App;