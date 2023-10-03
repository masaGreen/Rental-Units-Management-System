import * as React from 'react';
import { 
  CssBaseline,Collapse, ListSubheader, colors, Box, AppBar, Toolbar, List, Typography,
  ListItemButton, ListItemIcon, ListItemText, Button, Switch, Paper 
} from '@mui/material';
import { 
  ExpandLess, ExpandMore, StarBorder,AccountBalance , Person,RequestQuote,FileDownload,

} from '@mui/icons-material';
import { Link } from "react-router-dom";


const link = { 
  textDecoration: "none",
  color: "inherit",
}

type Props = {
  setMode : (arg0: boolean)=>void,
  mode : boolean
}
const primaryProps = { fontSize: '14px', color: colors.blue[900], fontWeight:"700" }
export default function Sidebar({setMode, mode}:Props) {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    return setOpen(!open)
  }

  return (
    <Paper>
    <Box sx={{ display: 'flex' }}>

      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: theme => theme.zIndex.drawer + 1 }}>
        <Toolbar sx={{ height: 80, zIndex: 1, background: "#607d8b", color: "#cfd8dc", display: "flex", justifyContent: "center", alignItems: "center" }}>

          <Typography variant="h4" component="div" sx={{ flex: 3, textAlign: "center", }} >
            Rental-Units-Management-System
          </Typography>
          <Switch onClick={()=>setMode(!mode)}></Switch>
          <Link to="availableUnits"><Button sx={{ flex: 1, fontSize: 20, textTransform: "none", color: "#cfd8dc" }}>All available units</Button></Link>
          <Button color="inherit" sx={{ flex: 1, fontSize: 20, textTransform: "none" }} >Logout</Button>
        </Toolbar>
      </AppBar>
      <Box sx={{ marginTop: "80px", }}>
        <List
          sx={{ width: '240px', height: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">

            </ListSubheader>
          }
        >
          <Link to="/units" style={link}>

            <ListItemButton  >
              <ListItemIcon>
                <AccountBalance />
              </ListItemIcon>
              <ListItemText primary="Units" primaryTypographyProps={{ fontSize: '18px' }} />

            </ListItemButton>

          </Link>

          <Link to="/tenants" style={link} >
            <ListItemButton >
              <ListItemIcon>
                <Person />
              </ListItemIcon>
              <ListItemText primary="Tenants" primaryTypographyProps={{ fontSize: '18px' }} />
            </ListItemButton>
          </Link>

          <Link to="/utilities" style={link}>
            <ListItemButton >
              <ListItemIcon>
                <RequestQuote />
              </ListItemIcon>
              <ListItemText primary="Utilities" primaryTypographyProps={{ fontSize: '18px' }} />

            </ListItemButton>
          </Link>
          <ListItemButton onClick={() => handleClick()} >
            <ListItemIcon>
              <FileDownload />
            </ListItemIcon>
            <ListItemText primary="Downloads" primaryTypographyProps={{ fontSize: '18px' }} />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>

              <Link
                to="http://localhost:8080/v1/utilities/download/allUtilPayments"
                download="allUtilPayments"
                target="_self"
                rel='noreferrer'
              >
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <StarBorder />
                  </ListItemIcon>
                  <ListItemText primary="all-utilitiespayments"
                    primaryTypographyProps={primaryProps} />
                </ListItemButton>
              </Link>

              <Link
                to="http://localhost:8080/v1/utilities/download/allUtilPaymentsWithPendingBills"
                download="pendingPayments"
                target='_self'
                rel='noreferrer'
              >
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <StarBorder />
                  </ListItemIcon>
                  <ListItemText primary="unpaid-utilitiespayments" sx={{ '&:hover': { textDecoration: "underline" } }} primaryTypographyProps={primaryProps} />
                </ListItemButton>
              </Link>

              <Link
                to="http://localhost:8080/v1/tenants/download/allTenants"
                download="alltenants"
                target="_self"
                rel='noreferrer'
              >
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <StarBorder />
                  </ListItemIcon>
                  <ListItemText primary="alltenants" sx={{ '&:hover': { textDecoration: "underline" } }} primaryTypographyProps={primaryProps} />
                </ListItemButton>
              </Link>

              <Link
                to="http://localhost:8080/v1/tenants/download/allTenantsWithArrears"
                download="alltenantswitharrears"
                target="_self"
                rel='noreferrer'
              >
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <StarBorder />
                  </ListItemIcon>
                  <ListItemText primary="tenants-with-arrears" sx={{ '&:hover': { textDecoration: "underline" } }} primaryTypographyProps={primaryProps} />
                </ListItemButton>
              </Link>

              <Link
                to="http://localhost:8080/v1/units/download/allUnits"
                download={"unitslist"}
                target="_self"
                rel='noreferrer'
              >
                <ListItemButton sx={{ pl: 4 }} >
                  <ListItemIcon>
                    <StarBorder />
                  </ListItemIcon>
                  <ListItemText primary="allunits" primaryTypographyProps={primaryProps}
                    sx={{ '&:hover': { textDecoration: "underline" } }}
                  />
                </ListItemButton>
              </Link>
            </List>
          </Collapse>
        </List>
      </Box>
    </Box>
    </Paper>
  );
}