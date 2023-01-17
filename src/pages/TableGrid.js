import './TableGrid.css';

import React, { useState, useEffect } from 'react';
import { Typography, Modal, Button, Box, IconButton, Paper, TableRow, TableHead, TableContainer, TableCell, TableBody,Table } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function GridTable(props) {
  const [showModal, setShowModal] = useState(false);
  const [selectPayment, setSelectPayment] = useState({});
  const [payments, setPayments] = useState(props.payment);


  const handleSelectRow = (paymentId) => {
    setSelectPayment(props.payment.find(obj => {return obj.id == paymentId}));
    setShowModal(true);
  };

  const deletePayment = () => {
    setPayments(payments.filter(x => x.id != selectPayment.id));
    setShowModal(false);
  };

  return (
    <>
      <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
              <TableRow>
              <TableCell align="center">ID</TableCell>
              <TableCell align="center">TIPO</TableCell>
              <TableCell align="center">VALOR</TableCell>
              </TableRow>
          </TableHead>
          <TableBody>
              {payments.map((row) => (
              <TableRow
                  key={row.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  onClick={() => handleSelectRow(row.id)}
              >
                  <TableCell align="center">{row.id}</TableCell>
                  <TableCell align="center">{row.type}</TableCell>
                  <TableCell align="center">{row.value}</TableCell> 
              </TableRow>
              ))}
             
          </TableBody>
          </Table>
      </TableContainer>

      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
      >
         <Box sx={style}>
          <Typography className='Title' id="modal-modal-title" variant="h6" component="h2">
            DETALHES
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Id: {selectPayment.id}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Tipo: {selectPayment.type}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Valor: {selectPayment.value}
          </Typography>
          <Box className='Button'>
            <Button onClick={deletePayment} variant="contained" color="error">
              DELETAR
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}

export default GridTable;