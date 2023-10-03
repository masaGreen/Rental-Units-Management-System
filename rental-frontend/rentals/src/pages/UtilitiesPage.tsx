
import { Box, Button, TextField } from "@mui/material"
import { ChangeEvent, useState } from "react";
import { Outlet, Link } from "react-router-dom"
import { minNav, searchStyles } from "./TenantsPage";
import { linkStyle, linkbtn } from "./UnitPage";


export default function UtilitiesPage() {
    const [search, setSearch] = useState("");

    function handleSearch(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
        setSearch(event.target.value);
    }
    return (
        <Box sx={{ marginTop: "-10%" }}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Box sx={minNav}>
                    <Link to="" style={linkStyle}><Button sx={linkbtn}>All UtilitiesPayments</Button></Link>
                    <Link to="registerutility" style={linkStyle}><Button sx={linkbtn}>Add UtilityPayment</Button></Link>
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