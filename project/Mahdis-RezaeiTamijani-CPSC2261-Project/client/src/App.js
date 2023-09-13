import Modal from 'react-modal';
import Calendar from './Components/Calendar';
import './App.css';

Modal.setAppElement('#root');

function App(props) {

  return (
    <Calendar />

  );
}

export default App;
