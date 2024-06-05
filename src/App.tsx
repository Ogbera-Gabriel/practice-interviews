
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Charaters from './component/charaters/charaters';
import Planets from './component/planets/planet';
import HomePage from './component/home/homepage';
import Tictactoe from './component/tic-tac-toe/tictactoe';
import Jobs from './component/job/jobs';
import Clock from './component/digital-clock/digital';
import Test from './component/test/test';



function App() {
  return (
    <Router>
       <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/characters" element={<Charaters />} />
        <Route path="/planets" element={<Planets/>} />
        <Route path='/game' element={<Tictactoe/>} />
        <Route path="/jobs" element={<Jobs/>} />
        <Route path="/time" element={<Clock/>} />
	      <Route path="/test" element={<Test />} />
       </Routes>
    </Router>
  );
}

export default App;

