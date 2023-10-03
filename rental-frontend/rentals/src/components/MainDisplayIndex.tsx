import { Box, Card, CardContent, IconButton, Toolbar, Typography } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
export default function LandingIndex() {
  //GET UNITS, UTILITIES,TENANTS FROM GLOBAL STATE.
  return (
    <>
      <Toolbar />
      <Card sx={{ flex: 1 }}>

        <CardContent>
          <Box sx={{ display: "flex", alignItems: "center", marginBottom: "1.5rem" }}>
            <IconButton>
              <PersonIcon sx={{ fontSize: "4rem" }} />
            </IconButton>
            <Typography variant={"h6"} component={"div"} >
              41
            </Typography>
          </Box>

          <Typography paragraph>
            Units under management
          </Typography>
        </CardContent>
      </Card>
      <Card sx={{ flex: 1 }}>

        <CardContent>
          <Box sx={{ display: "flex", alignItems: "center", marginBottom: "1.5rem" }}>
            <IconButton>
              <PersonIcon sx={{ fontSize: "4rem" }} />
            </IconButton>
            <Typography variant={"h6"} component={"div"} >
              41
            </Typography>
          </Box>
          <Typography paragraph>
            Registred tenants
          </Typography>
        </CardContent>
      </Card>
      <Card sx={{ flex: 1 }}>

        <CardContent>
          <Box sx={{ display: "flex", alignItems: "center", marginBottom: "1.5rem" }}>
            <IconButton>
              <PersonIcon sx={{ fontSize: "4rem" }} />
            </IconButton>
            <Typography variant={"h6"} component={"div"} >
              41
            </Typography>
          </Box>
          <Typography paragraph>
            Utilities Tracking
          </Typography>
        </CardContent>
      </Card>
    </>
  )
}