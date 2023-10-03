
import { Box, Button,  TextField, colors } from "@mui/material"
import { ChangeEvent, useState } from "react";
import { Outlet, Link } from "react-router-dom"
import { minNav, searchStyles } from "./TenantsPage";
export const linkbtn = { 
   
    textTransform: "none", 
    verticalAlign:"center",
    color: "black",
    background: colors.green[300],
    "&:hover":{
        background:'#1b5e20'
    }
}

export const linkStyle = {
    padding: "0.5rem",
    fontWeight:400, 
    background: "transparent",
}

export default function UnitPage() {
    const [search, setSearch] = useState("");

    function handleSearch(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
        setSearch(event.target.value);
    }
    return (
        <Box sx={{ marginTop: "-10%" }}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Box sx={minNav}>
                    <Link to="" style={linkStyle} ><Button sx={linkbtn}>All Units</Button></Link>
                    <Link to="registerunit" style={linkStyle}><Button sx={linkbtn}>Add Units</Button></Link>
                    <Link to="updatestatus" style={linkStyle}><Button sx={linkbtn}>Edit Availability status</Button></Link>
                    <TextField
                        value={search}
                        onChange={handleSearch}
                        placeholder="search by unit number"
                        sx={searchStyles}
                    >
                    </TextField>
                </Box>
                <Box>
                    <Outlet context={search} />
                </Box>
            </Box>
        </Box>
    )


}