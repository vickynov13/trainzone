import { useEffect, useState } from 'react';
import { Button, Stack,Form,Card,ButtonGroup } from 'react-bootstrap';
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
        <Card>
      <Card.Body>
        <Stack direction="horizontal" gap={3}>
            <div className="p-2">Drive Status</div>
            <div className="p-2">
                <Form >
                    <Form.Check
                        type="switch"
                        id="custom-switch1"
                        label={statusres.runStatus===0 ? "Idle" :"Power"}
                        //checked={runstatus===0 ? false :true}
                        checked={statusres.runStatus===0 ? false :true}
                        onChange={()=>switchStatus()}
                    />
                </Form>
            </div>
        </Stack>
        Speed :  -
        <ButtonGroup aria-label="Speed Control">
        <Button 
          disabled={statusres.runStatus===0}
          variant="info"
          onClick={()=>speedUD('down')}>
          Down
        </Button>
        <Button 
          disabled={statusres.runStatus===0}
          variant="warning"
          onClick={()=>speedUD('up')}>
          Up
        </Button>
        </ButtonGroup>
        <Stack direction="horizontal" gap={3}>
            <div className="p-2">Head Lamp Brightness : </div>
            <div className="p-2">
                <Form >
                    <Form.Check
                        type="switch"
                        id="custom-switch"
                        label={statusres.headLamp===160 ? "Low" :"High"}
                        //checked={runstatus===0 ? false :true}
                        checked={statusres.headLamp===160 ? false :true}
                        onChange={()=>maxBrightheadlamp()}
                    />
                </Form>
            </div>
        </Stack>
        OverHead Lamp :
        <Form>
            <div key="inline-radio" className="mb-3">
              <Form.Check
                inline
                label="ON / Low"
                name="group1"
                type="radio"
                id="inline-radio-1"
                checked={statusres.comp1light===160 ? true :false}
                onChange={()=>setelamp("1")}
              />
              <Form.Check
                inline
                label="High"
                name="group1"
                type="radio"
                id="inline-radio-3"
                checked={statusres.comp1light > 200 ? true :false}
                onChange={()=>setelamp("2")}
              />
              <Form.Check
                inline
                label="OFF"
                name="group1"
                type="radio"
                id="inline-radio-2"
                checked={statusres.comp1light===0 ? true :false}
                onChange={()=>setelamp("0")}
              />
            </div>
        </Form>
        
        <Button 
          variant="danger"
          onClick={()=>reset()}>
          Reset All
        </Button>
        </Card.Body>
    </Card>
    
        <p>Selected Refresh Rate : {props.refreshRate}</p>
        <p>Api Runstatus : {statusres.runStatus}</p>
        <p>Api Speed dutycycle : {statusres.speed}</p>
        <p>Api Head lamp dutycycle : {statusres.headLamp}</p>
        <p>Api OverHead lamp dutycycle : {statusres.comp1light}</p>
        </>
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
  
  function maxBrightheadlamp(){
      setstatusres(null);
      let statusVal;
      (statusres.headLamp===160) ? statusVal = 1 :statusVal =0;
      axios.get(baseURL+`/set/headLamp?value=${statusVal}`).then((response) => {
        setstatusres(response.data);
      }).catch(error => {
        setstatusres(null);
      });
  }
  
  
  function speedUD(speedctrl){
      setstatusres(null);
      axios.get(baseURL+`/speed/${speedctrl}`).then((response) => {
        setstatusres(response.data);
      }).catch(error => {
        setstatusres(null);
      });
  }
  function setelamp(elampctrl){
      setstatusres(null);
      axios.get(baseURL+`/set/comp1light?value=${elampctrl}`).then((response) => {
        setstatusres(response.data);
      }).catch(error => {
        setstatusres(null);
      });
  }
  async function reset(){
      setstatusres(null);
      await axios.get(baseURL+`/resetall`);
      axios.get(baseURL+'/status').then((response) => {
        setstatusres(response.data);
      }).catch(error => {
        setstatusres(null);
      });
  }
}



export default Pilot;
