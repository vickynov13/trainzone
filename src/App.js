import Header from './Header';
import Pilot from './Pilot';
import { useState } from 'react';
import {Stack} from 'react-bootstrap';


function App() {
  const [refreshRate, setrefreshRate]=useState(0);
  function updaterefreshRate(refreshrate){
      setrefreshRate(refreshrate);
  };
  return (
    <>
      <Header upstate = {updaterefreshRate} />
      <Stack gap={2} className="mx-auto">
        <div className="p-2"></div>
        <div><Pilot refreshRate={refreshRate}/></div>
      </Stack>
    </>
  );
}

export default App;
