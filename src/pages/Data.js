import TableGrid from './TableGrid';
import React, { useState, useEffect } from 'react';
import { Typography } from '@mui/material';

function Data(props) {
  const [payments, setPayments] = useState(null);
  
    useEffect(() => {
        fetch(`${window.URL}/Payment/${props.userId}`)
            .then((response) => response.json())
            .then((data) => {
                setPayments(data);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

    if(payments != null)
    {
        return (
            <>
              <Typography style={{display: 'flex', justifyContent:'center'}}>GRID A</Typography>
              <TableGrid payment={payments[0]}/>

              <Typography style={{display: 'flex', justifyContent:'center', paddingTop: '50px'}}>GRID B</Typography>
              <TableGrid payment={payments[1]}/>
      
              <Typography style={{display: 'flex', justifyContent:'center', paddingTop: '50px'}}>GRID C</Typography>
              <TableGrid payment={payments[2]}/>
            </>
        );
    }
}

export default Data;
