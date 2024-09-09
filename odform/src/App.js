import logo from './logo.svg';
import './css/home.css';
import Home from './components/Home';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Studentlogin from './components/studentlogin';
import TeacherLogin from './components/teacherlogin';
import HodLogin from './components/hodlogin';
import Studenthome from './components/studenthome';
import StudentSignup from './components/studentsignup';
import OnDutyForm from './components/studentodinfo';
import Previousod from './components/previousod';
function App() {
  return (
  
   <Router>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/studentlogin" element={<Studentlogin/>}/>
      <Route path="/teacherlogin" element={<TeacherLogin/>}/>
      <Route path="/hodlogin" element={<HodLogin/>}/>
      <Route path="/studenthome" element={<Studenthome/>}/>
      <Route path="/studentsignup" element={<StudentSignup/>}/>
      <Route path="/studentodinfo" element={<OnDutyForm/>}/>
      <Route path="/studentodinfo/:email" element={<OnDutyForm />} />
      <Route path="/previousod" element={<Previousod />} />
      {/* <Route path="/studenthome2" element={<Studenthome/>}/> */}
    </Routes>
   </Router>
 
  );
}

export default App;
