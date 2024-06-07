import React, { useState } from "react";
import { AppBar, Button, Tab, Tabs, Toolbar, useMediaQuery, useTheme } from "@mui/material";
import SideBar from "./sideBar/SideBar";
import { Link } from "react-router-dom";

function Navbar() {
  const [value, setValue] = useState();
  const theme = useTheme();
  console.log(theme);
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
 
  return (
    <>
     <AppBar sx={{ color: "#063970",position:'relative',background:'#ffff' }}>
        <Toolbar>
        <img src="https://i.postimg.cc/qggmrG4j/logo.png" alt="Logo" style={{ width:'35px', borderRadius:'5px' }}/>
          {isMatch ? (
            <>
              <SideBar/>
            </>
          ) : (
            <>
              <Tabs
                sx={{ marginLeft: "5%" }}
                indicatorColor="secondary"
                textColor="inherit"
                value={value}
                onChange={(e, value) => setValue(value)}
              >
                <Tab label={<Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>Home</Link>} />
                <Tab label={<Link to="/dashboard" style={{ textDecoration: 'none', color: 'inherit' }}>Dashboard</Link>} />
                <Tab label="About " />
                <Tab label="Contact" />
                <Tab label="Services" />
                <Tab label="Blog" />
              </Tabs>
              <Button sx={{ marginLeft: "auto",background:'#04AA6D' }} variant="contained" component={Link} to="/login">
                Login
              </Button>
              <Button sx={{ marginLeft: "10px",color:'#04AA6D',background:'#e6e6e6' }} variant="contained">
                SignUp
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </>
  )
}

export default Navbar

