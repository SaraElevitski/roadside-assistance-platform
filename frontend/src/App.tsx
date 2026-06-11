import { Route, Routes } from 'react-router-dom';
import './App.scss'
import Home from './components/Home/Home'
import LogIn from './components/LogIn/LogIn';
import MainComp from './components/MainComp/MainComp';
import SignUp from './components/SignUp/SignUp';
import ManagingVolunteers from './components/ManagingVolunteers/ManagingVolunteers';
import HelpRequests from './components/HelpRequests/HelpRequests';



function App() {


  return (
    <>
     <Routes>
      
      <Route path='/' element={<MainComp></MainComp>}>
    <Route  path='ManagingVolunteers' element={<ManagingVolunteers></ManagingVolunteers>}></Route>
        <Route index element={<Home></Home>}></Route>
         <Route path='helpRequests' element={<HelpRequests></HelpRequests>}></Route>
          <Route path='login' element={<LogIn></LogIn>}></Route>
        <Route  path='signUp' element={<SignUp></SignUp>}></Route>
        
      </Route> 

      {/* <Route path='*' element={<NotFound></NotFound>}></Route> */}
    </Routes>

    </>
  )
}

export default App
