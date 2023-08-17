import { useEffect, useState } from 'react';
import { Button, Stack,Form } from 'react-bootstrap';
import axios from 'axios';


const baseURL = 'http://ec2-54-199-245-177.ap-northeast-1.compute.amazonaws.com';

function Pilot(props) {
  const [statusres, setstatusres]=useState(null);
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    axios.get(baseURL+'/status').then((response) => {
      setstatusres(response.data);
    }).catch(error => {
      setstatusres(null);
    });
  },[]);
  useEffect(()=>{
    if(props.refreshRate >0){
    const interval = setInterval(() => {
      setTime(new Date());
      axios.get(baseURL+'/status').then((response) => {
      setstatusres(response.data);
      console.log(response.data);
        }).catch(error => {
          setstatusres(null);
        });
    }, props.refreshRate*1000);
    return () => clearInterval(interval);
  }
  },[time,props]);
  return (
    <div>
        {statusres
        ? 
        <>
        <Stack direction="horizontal" gap={3}>
            <div className="p-2">Status</div>
            <div className="p-2">
                <Form >
                    <Form.Check
                        type="switch"
                        id="custom-switch"
                        label="Check this switch"
                        //checked={runstatus===0 ? false :true}
                        checked={statusres.runStatus===0 ? false :true}
                        onChange={()=>switchStatus()}
                    />
                </Form>
            </div>
        </Stack>
        <p>{props.refreshRate}</p>
        <p>{statusres.runStatus}</p>
        <p>{statusres.speed}</p>
        <Button variant="success">Down</Button>
        <Button variant="danger">Up</Button></>
        : <p>Loading.... Refresh Page, if it takes more time. Server might be down</p>
        }
    </div>
  );
  function switchStatus(){
    setstatusres(null);
    let statusVal;
    (statusres.runStatus===0) ? statusVal = 1 :statusVal =0;
    axios.get(baseURL+`/set/runStatus?value=${statusVal}`).then((response) => {
      setstatusres(response.data);
    }).catch(error => {
      setstatusres(null);
    });
}
}



export default Pilot;
