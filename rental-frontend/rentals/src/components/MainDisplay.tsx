import {Outlet} from "react-router-dom";
import { Box} from "@mui/material"


export default function MainDisplay(){
    return (
        <Box component="main" sx={{ flexGrow: 1, 
            p: 3 ,display:"flex", marginTop:"15%", height:"250px", gap:"0.5rem"}}>
             <Outlet/>
            </Box>
    )
}