import './App.css';
import Login from './Components/Login';
import { Route,Routes } from 'react-router-dom';
import SignUp from './Components/SignUp';
import Contacts from './Components/Contacts';
import { useSelector } from 'react-redux';
import { ProtectedRoute } from './utils/ProtectedRoute';
import Check from './Components/Check';
function App() {
  const userdata=useSelector((state)=>state?.auth);
  console.log(userdata,'=>state;');
  return (
    <div className="App">
      <Routes>
        <Route exact path='/'  element={<Login/>}/>
        <Route  path='/Signup'  element={<SignUp/>}/>

          <Route
            exact
            path='/Contact'
            element={
              <ProtectedRoute user={userdata}>
                <Contacts />
              </ProtectedRoute>
            }
          />


          {/* <Route
            exact
            path='/Check'
            element={
              <ProtectedRoute user={userdata}>
                <Check />
              </ProtectedRoute>
            }
          /> */}
      </Routes>
      
    </div>
  );
}

export default App;
