import './App.css';
import Data from './Data';
import React, { useState, useEffect } from 'react';
import {TabContext,TabList, TabPanel } from '@mui/lab';
import { Typography, Button, Select, FormControl, MenuItem, InputLabel, Box, Tab, Alert, Snackbar } from '@mui/material';

//API URL
window.URL = "https://localhost:7023/api";

function App() {
  const [value, setValue] = useState('1');
  const [isDisabled, setIsDisabled] = useState(true);
  const [open, setOpen] = useState(false);

  const [users, setUsers] = useState([]);
  const [user, setUser] = useState('');

  
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleUserChange = (event) => {
    setUser(event.target.value);
  };

  const loadPayments = () => {
    if(user == '')
    {
      setOpen(true);
    }
    else
    {
      setIsDisabled(false);
      setValue("2");
    }
  }

  useEffect(() => {
    fetch(`${window.URL}/User` )
       .then((response) => response.json())
       .then((data) => {
          setUsers(data);
       })
       .catch((err) => {
          console.log(err.message);
       });
  }, []);

  return (
      <>
        <TabContext value={value}>
          <Box className='Header' sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Selecionar Usuário" value="1" />
              <Tab label="Dados Pagamento" value="2" disabled={isDisabled}/>
            </TabList>
          </Box>
          <Box className='TabUser'>
            <TabPanel value="1">
              <Box sx={{ minWidth: 300 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Usuário</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={user}
                    onChange={handleUserChange}
                  >
                    {users.map((item) => (
                      <MenuItem
                        key={item.id}
                        value={item.id}
                      >
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Box className='Button'>
                  <Button variant="contained" onClick={loadPayments}>SALVAR</Button>
                </Box>
              </Box>
            </TabPanel>

            <TabPanel value="2" >
              <Data userId={user}/>
            </TabPanel>
          </Box>
        </TabContext>

        <Snackbar open={open} autoHideDuration={6000} onClose={() => setOpen(false)}>
          <Alert severity="warning" sx={{ width: '100%' }}>
            Selecione um usuário para continuar
          </Alert>
        </Snackbar>
      </>
  );
}

export default App;
