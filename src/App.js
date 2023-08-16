import Header from './Header';
import Pilot from './Pilot';
import {Stack} from 'react-bootstrap';


function App() {
  return (
    <>
    <Header/>
    <Stack gap={2} className="col-md-5 mx-auto">
      <div className="p-2"></div>
      <div className="p-2"><Pilot/></div>
    </Stack>
    </>
  );
}

export default App;
