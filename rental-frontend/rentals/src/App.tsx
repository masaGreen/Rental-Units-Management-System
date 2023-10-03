
import { ThemeProvider } from '@mui/material/styles'
import { colors, CssBaseline } from "@mui/material";
import Box from "@mui/material/Box";
import Sidebar from "./components/Sidebar";
import MainDisplay from "./components/MainDisplay";
import { Routes, Route } from "react-router-dom";

import LandingIndex from "./components/MainDisplayIndex";
import UnitPage from "./pages/UnitPage";
import UnitsList from "./components/units/UnitsList";
import RegisterUnit from "./components/units/RegisterUnit";
import UpdateStatus from "./components/units/UpdateStatus";
import TenantsPage from "./pages/TenantsPage";
import TenantsList from "./components/tenants/TenantsList";
import RegisterTenant from "./components/tenants/RegisterTenant";
import UpdatePaymentStatus from "./components/tenants/UpdatePaymentStatus";
import UtilitiesPage from "./pages/UtilitiesPage";
import UtilitiesList from "./components/utilities/UtilitieList";
import RegisterUtlitity from "./components/utilities/RegisterUtility";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useState } from "react";
import {createTheme } from "@mui/material";


function App() {
  // const [auth, setAuth] = useState(false);
  const [mode, setMode] = useState(true)
  const theme = createTheme({
    palette:{
      mode: mode?"light":"dark"
    }
  })
  


  return (
    <ThemeProvider theme={theme}>
    
    <Box sx={{ height: "100vh", display: "flex", rowGap: "24px", background: colors.blueGrey[100] }}>
    <CssBaseline /> 
      <Sidebar setMode={setMode} mode={mode} />
      <Routes>
        
        <Route path="/" element={<MainDisplay />}>

        <Route path="/signup" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>
          <Route path="/availableunits" element={<UnitsList availability={true} />}></Route>
          <Route path="" element={<LandingIndex />}></Route>
          <Route path="units" element={<UnitPage />}>
            <Route path="" element={<UnitsList availability={false} />}></Route>
            <Route path="registerunit" element={<RegisterUnit />}></Route>
            <Route path="updatestatus" element={<UpdateStatus />}></Route>
          </Route>
          <Route path="tenants" element={<TenantsPage />}>
            <Route path="" element={<TenantsList />}></Route>
            <Route path="registerunit" element={<RegisterTenant />}></Route>
            <Route path="updatestatus" element={<UpdatePaymentStatus />}></Route>
          </Route>
          <Route path="utilities" element={<UtilitiesPage />}>
            <Route path="" element={<UtilitiesList />}></Route>
            <Route path="registerutility" element={<RegisterUtlitity />}></Route>
          </Route>
        </Route>

      </Routes>
    </Box>
   
    </ThemeProvider>
    
  )
}

export default App
