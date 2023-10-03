
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

type UnitType = {
  id: number,
  plotName: string,
  unitNumber: string,
  tag: string,
  status: boolean,
  rent: number
}
type AvailabilityType = { availability: boolean }


export default function UnitsList({ availability }: AvailabilityType) {
  const [units, setUnits] = useState<UnitType[] | null>(null)
  const [open, setOpen] = useState(false);
  const [myid, setId] = useState<number | null>(null)
  const search = useOutletContext<string>()
  const handleOpen = (id: number) => {
    setOpen(true)
    setId(id)

  };
  const url = "http://localhost:8080/v1/units";
  const handleClose = () => setOpen(false);
  useEffect(() => {
    async function fetchUnits() {
      if (!availability) {
        const res = await fetch(url);
        const { units } = await res.json();
        const filteredUnits = units?.filter((unit: UnitType) => unit.unitNumber.toLowerCase().includes(search.toLowerCase()));

        setUnits(filteredUnits)
      } else {
        const res = await fetch(`${url}/getAvailableUnits`);
        const { units } = await res.json();
        setUnits(units)
      }
    }
    fetchUnits()
  }, [open, search])
  if (units === null) {
    <CircularProgress />
  }
  if (units?.length === 0) {
    return (
      availability ?
        <Typography variant="h4" component="div"> No units available</Typography>
        : <Typography variant="h4" component="div"> No units registered</Typography>

    )
  }


  return (
    <TableContainer component={Paper} sx={{ marginTop: availability ? "-2rem" : "2rem" }}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Id</StyledTableCell>
            <StyledTableCell align="right">Plotname</StyledTableCell>
            <StyledTableCell align="right">Unitnumber</StyledTableCell>
            <StyledTableCell align="right">Tag</StyledTableCell>
            <StyledTableCell align="right">Status</StyledTableCell>
            <StyledTableCell align="right">Rent&nbsp;(Ksh)</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {units?.map((row) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell component="th" scope="row">
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  {row.id}
                  <Tooltip title="delete" placement='right'>
                    <IconButton onClick={() => handleOpen(row.id)}><DeleteForeverOutlined /></IconButton>
                  </Tooltip></Box>
                <DeletionModal open={open} handleClose={handleClose} id={myid} url={`${url}/reset`} />
              </StyledTableCell>
              <StyledTableCell align="right">{row.plotName}</StyledTableCell>
              <StyledTableCell align="right">{row.unitNumber}</StyledTableCell>
              <StyledTableCell align="right">{row.tag}</StyledTableCell>
              <StyledTableCell align="right">{row.status ? "available" : "unavailable"}</StyledTableCell>
              <StyledTableCell align="right">{row.rent}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}