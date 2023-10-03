
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import {
    Box, Typography, TableCell, TableRow, TableHead, Paper,
    TableContainer, Table, IconButton, Tooltip, CircularProgress,TableBody

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

type UtilityType = {
    id: number,
    date: string,
    waterBill: string,
    garbage: string,
    unitNumber: string,
    amountPaid: string,
    status: string,
    unit: {
        id: number,
        plotName: string,
        unitNumber: string,
        tag: string,
        status: boolean,
        rent: number
    }
}


export default function UtilitiesList() {
    const [utilities, setUtilities] = useState<UtilityType[] | null>(null)
    const [open, setOpen] = useState(false);
    const [myid, setId] = useState<number | null>(null)
    const search = useOutletContext<string>()
    const url = "http://localhost:8080/v1/utilities";
    const handleOpen = (id: number) => {
        setOpen(true)
        setId(id)

    };
    const handleClose = () => setOpen(false);
    useEffect(() => {
        async function fetchUtilities() {
            const res = await fetch(url);
            const { utilsPayments } = await res.json();
            const filteredUtilsPayments = utilsPayments?.filter((utility: UtilityType) => utility.unit.unitNumber.toLowerCase().includes(search.toLowerCase()))
            setUtilities(filteredUtilsPayments)

        }
        fetchUtilities()
    }, [open, search])
   
    if (utilities === null) {
        <CircularProgress />
    }
    if (utilities?.length === 0) {
        return (

            <Typography variant="h4" component="div"> No utilities have been registered</Typography>

        )
    }


    return (
        <TableContainer component={Paper} sx={{ marginTop: "2rem" }}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Id</StyledTableCell>
                        <StyledTableCell align="right">Date</StyledTableCell>
                        <StyledTableCell align="right">Waterbill</StyledTableCell>
                        <StyledTableCell align="right">Garbage</StyledTableCell>
                        <StyledTableCell align="right">Amount Paid</StyledTableCell>
                        <StyledTableCell align="right">Status</StyledTableCell>
                        <StyledTableCell align="right">Unitnumber</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {utilities?.map((row) => (
                        <StyledTableRow key={row.id}>
                            <StyledTableCell component="th" scope="row">
                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                    {row.id}
                                    <Tooltip title="delete" placement='right'>
                                        <IconButton onClick={() => handleOpen(row.id)}><DeleteForeverOutlined /></IconButton>
                                    </Tooltip></Box>
                                <DeletionModal open={open} handleClose={handleClose} id={myid} url={`${url}/deleteUtilities`} />
                            </StyledTableCell>
                            <StyledTableCell align="right">{row.date.substring(0, 10)}</StyledTableCell>
                            <StyledTableCell align="right">{row.waterBill}</StyledTableCell>
                            <StyledTableCell align="right">{row.garbage}</StyledTableCell>
                            <StyledTableCell align="right">{row.amountPaid}</StyledTableCell>
                            <StyledTableCell align="right">{row.status}</StyledTableCell>
                            <StyledTableCell align="right">{row.unit.unitNumber}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}