import { Route } from 'react-router-dom';
import './App.css';
import { CreateRoutes } from "./routes/CreateRoutes";
import { Navbar } from './components/Navbar/Navbar';

function App() {
  return (
    <div>
      <Navbar />
      <CreateRoutes />
    </div>
  );
}

export default App;
