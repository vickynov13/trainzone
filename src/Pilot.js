import { useEffect, useState } from 'react';
import { Button, Stack,Form } from 'react-bootstrap';
import axios from 'axios';


const baseURL = 'http://ec2-54-199-245-177.ap-northeast-1.compute.amazonaws.com';

function Pilot() {
  const [statusres, setstatusres]=useState(null);
  const [runstatus, setrunstatus]=useState(0);
  useEffect(() => {
    axios.get(baseURL+'/status').then((response) => {
      setstatusres(response.data);
    });
  });
  return (
    <div>
        {statusres
        ? 
        <>
        <Stack direction="horizontal" gap={3}>
            <div className="p-2">Status</div>
            <div className="p-2" onSubmit={setrunstatus(1)}>
                <Form>
                    <Form.Check // prettier-ignore
                        type="switch"
                        id="custom-switch"
                        label="Check this switch"
                    />
                </Form>
            </div>
        </Stack>
        <p>{statusres.runStatus}</p>
        <p>{statusres.speed}</p>
        <Button as="a" variant="primary">
          Button as link
        </Button></>
        : <p>Loading....</p>
        }
    </div>
  );
}

function switchStatus(runstatus){
    if(runstatus===0){
        return(1);
    }else{
        return(0);
    }
}

export default Pilot;
