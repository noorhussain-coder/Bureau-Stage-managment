
import './App.css'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import BureauStageHomepage from './Components/Home/Home2'
import StudentHomepage from './Components/Home/home'
import AdminDashboard from './Components/Admin/Dashboard/Dashboard'
import RegistrationPage from './Components/Auth/Register'

import LoginPage from './Components/Auth/Login'

import SideDashboard from './Components/Admin/Dashboard/SideDashboard'
import BlogCreate from './Components/Admin/Blog/createBlog'

import SendEmail from './Components/Admin/Email/SendEmail'
import Application from './Components/Admin/Apply/Application'
import Setting from './Components/Admin/Setting/Setting'
import Calendar from './Components/Admin/Calendar/Calendar'
import About from './Components/Pages/About'
import Apply from './Components/Pages/Apply'
import Events from './Components/Pages/Events'
import Services from './Components/Pages/Services'
import Navbar from './Components/Home/Navbar'
import CreateStage from './Components/Pages/CreateStage'
import AnnouncementManagement from './Components/Admin/AnnouncementManagement'

function App() {


  return (
   <>
   <BrowserRouter>
   <Navbar/>
   <Routes>
<Route path='/home'  element={<StudentHomepage/>} />
<Route path='/'  element={<BureauStageHomepage/>} />

<Route path='/register'  element={<RegistrationPage/>} />
<Route path='/login'  element={<LoginPage/>} />
{/* user */}
<Route path='/about'  element={<About/>} />
<Route path='/apply'  element={<Apply/>} />
<Route path='/events'  element={<Events/>} />
<Route path='/service'  element={<Services/>} />

{/* //Admin */}
<Route path='/dashboard'  element={<AdminDashboard/>} >
<Route index element={<SideDashboard/>} />
<Route path='create-blog'  element={<BlogCreate/>} />
<Route path='create-email'  element={<SendEmail/>} />
<Route path='application'  element={<Application/>} />
<Route path='create-stage'  element={<CreateStage/>} />
<Route path='calendar'  element={<Calendar/>} />
<Route path='setting'  element={<Setting/>} />
<Route path='announcement'  element={<AnnouncementManagement/>} />
</Route>



   </Routes>
   </BrowserRouter>

   </>
  )
}

export default App
