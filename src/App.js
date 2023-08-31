import ToDoFunc from './Pages/ToDo/ToDoFunc';
import SingleTask from './Pages/SingleTask';
import NoFound from './Pages/NoFOund';
import NavBar from './components/NavBar/NavBar.js';
import { Route, Routes } from 'react-router-dom';
import AboutUs from './Pages/AboutUs/AboutUs';
import Tostify from './components/Tostify/Tostify';
import Registration from './Pages/Register/Register';
import LogIn from './Pages/LogIn/LogIn';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="mainDiv">
      <NavBar />
      <Routes>
        <Route path="/" element={<ToDoFunc />} />
        <Route path="/task/:id" element={<SingleTask />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/signin" element={<LogIn />} />
        <Route path="*" element={<NoFound />} />
      </Routes>
      <Tostify />
    </div>
  );
}

export default App;