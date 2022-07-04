import logo from './logo.svg';
import './App.css';
import EMSHeader from './components/EMSHeader';
import EMSBody from './components/EMSBody';
import 'antd/dist/antd.css';

function App() {
  return (
    <div className="App">
      <EMSHeader/>
      <EMSBody />
    </div>
  );
}

export default App;
