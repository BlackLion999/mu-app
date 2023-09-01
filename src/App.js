import Home from './Pages/Home/Home'
import ToDoFunc from './Pages/ToDo/ToDoFunc';
import AboutUs from './Pages/AboutUs/AboutUs';
import SingleTask from './Pages/SingleTask';
import NoFound from './Pages/NoFOund';
import Registration from './Pages/Register/Register';
import LogIn from './Pages/LogIn/LogIn';
import NavBar from './components/NavBar/NavBar.js';
import Tostify from './components/Tostify/Tostify';
import { Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="mainDiv">
      <NavBar />
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/todo" element={<ToDoFunc />} />
        <Route path="/task/:id" element={<SingleTask />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/signin" element={<LogIn />} />
        <Route path="*" element={<NoFound />} />
      </Routes>
      <Tostify />
    </div>
  );
}

export default App;