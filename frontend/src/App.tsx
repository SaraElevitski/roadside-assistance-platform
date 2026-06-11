import { Route, Routes } from "react-router-dom";
import "./App.scss";
import Home from "./components/Home/Home";
import LogIn from "./components/LogIn/LogIn";
import MainComp from "./components/MainComp/MainComp";
import VolunteerForm from "./components/VolunteerForm/VolunteerForm";
import ManagingVolunteers from "./components/ManagingVolunteers/ManagingVolunteers";
import HelpRequests from "./components/HelpRequests/HelpRequests";
import Profile from "./components/Profile/Profile";
import Message from "./components/Message/Message";


function App() {
  return (
    <>
    <Message></Message>
      <Routes>
        <Route path="/" element={<MainComp></MainComp>}>
          <Route
            path="ManagingVolunteers"
            element={<ManagingVolunteers></ManagingVolunteers>}
          ></Route>
          <Route index element={<Home></Home>}></Route>
          <Route
            path="helpRequests"
            element={<HelpRequests></HelpRequests>}
          ></Route>
          <Route path="login" element={<LogIn></LogIn>}></Route>
          <Route
            path="VolunteerForm"
            element={<VolunteerForm isEdit={false}></VolunteerForm>}
          ></Route>
          <Route path="profile" element={<Profile></Profile>}></Route>
        </Route>

        
        {/* <Route path='*' element={<NotFound></NotFound>}></Route> */}
      </Routes>
    </>
  );
}

export default App;
