
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import {
  Box, Typography, IconButton, Tooltip, CircularProgress, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow, Paper
} from '@mui/material';
import { useEffect, useState } from 'react';
import { DeleteForeverOutlined } from '@mui/icons-material';
import DeletionModal from '../DeletionModal';
import { useOutletContext } from 'react-router-dom';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },

  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

type TenantType = {
  id: number,
  firstName: string,
  lastName: string,
  phone: string,
  start: string,
  end: string | null,
  payStatus: string,
  unit: {
    id: number,
    plotName: string,
    unitNumber: string,
    tag: string,
    status: boolean,
    rent: number
  }

}



export default function TenantsList() {
  const [tenants, setTenants] = useState<TenantType[] | null>(null)
  const [open, setOpen] = useState(false);
  const [myid, setId] = useState<number | null>(null)
  const search = useOutletContext<string>()
  const url = "http://localhost:8080/v1/tenants";
  const handleOpen = (id: number) => {
    setOpen(true)
    setId(id)

  };
  const handleClose = () => setOpen(false);
  useEffect(() => {
    async function fetchUnits() {
      const res = await fetch(url);
      const { tenants } = await res.json();
      const filteredTenants = tenants?.filter((tenant: TenantType) => tenant.unit.unitNumber.toLowerCase().includes(search.toLowerCase()))
      setTenants(filteredTenants)

    }
    fetchUnits()
  }, [open, search])

  if (tenants === null) {
    <CircularProgress />
  }
  if (tenants?.length === 0) {
    return (

      <Typography variant="h4" component="div"> No units have been registered</Typography>

    )
  }


  return (
    <TableContainer component={Paper} sx={{ marginTop: "2rem" }}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Id</StyledTableCell>
            <StyledTableCell align="right">Name</StyledTableCell>
            <StyledTableCell align="right">Phone</StyledTableCell>
            <StyledTableCell align="right">Start-End date</StyledTableCell>
            <StyledTableCell align="right">Paystatus</StyledTableCell>
            <StyledTableCell align="right">Unitnumber</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tenants?.map((row) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell component="th" scope="row">
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  {row.id}
                  <Tooltip title="delete" placement='right'>
                    <IconButton onClick={() => handleOpen(row.id)}><DeleteForeverOutlined /></IconButton>
                  </Tooltip></Box>
                <DeletionModal open={open} handleClose={handleClose}

                  id={myid}
                  url={`${url}/deleteTenant`} />
              </StyledTableCell>
              <StyledTableCell align="right">{row.firstName + " " + row.lastName}</StyledTableCell>
              <StyledTableCell align="right">{row.phone}</StyledTableCell>
              <StyledTableCell align="right">{row.start + "__" + `${(row.end == null) ? "" : row.end}`}</StyledTableCell>
              <StyledTableCell align="right">{row.payStatus}</StyledTableCell>
              <StyledTableCell align="right">{row.unit.unitNumber}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}