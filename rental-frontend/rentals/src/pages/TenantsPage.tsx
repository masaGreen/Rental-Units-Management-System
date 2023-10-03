
import { Box, Button,  TextField, colors } from "@mui/material"
import { ChangeEvent, useState } from "react";
import { Outlet, Link } from "react-router-dom"
import {  linkStyle, linkbtn } from "./UnitPage";


export const searchStyles = {
    "& .MuiTextField-root": {
        border: "4px",
     
    },
    "& .MuiInputBase-root": {
        background: colors.blue[500],
        color: "white",
        fontWeight: "700",
        
    
    }
}


export const minNav={
    display:"flex",
    alignItems:"center"
}
export default function TenantsPage() {
    const [search, setSearch] = useState("");

    function handleSearch(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
        setSearch(event.target.value);
    }
    return (
        <Box sx={{ marginTop: "-10%" }}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Box  sx={minNav}>
                    <Link to="" style={linkStyle}><Button sx={linkbtn}>All Tenants</Button></Link>
                    <Link to="registerunit" style={linkStyle}><Button sx={linkbtn}>Add Tenant</Button></Link>
                    <Link to="updatestatus" style={linkStyle}><Button sx={linkbtn}>Update payment status</Button></Link>
                    
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