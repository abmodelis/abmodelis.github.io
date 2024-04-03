import { AppBar, Avatar, Box, Container, Grid, Toolbar } from "@mui/material";
import React from "react";
import { LogoNavBar } from "../LogoNavBar";
import SearchBar from "../SearchBar";

export const LoginNavBar: React.FC<{}> = () =>{
    return (
        <Box sx={{flexGrow:1}}>
            <AppBar position="fixed">
                <Toolbar>
                    <Container maxWidth="xl">
                        <Grid container direction="row" justifyContent="space-between" alignItems="center">
                            <Grid item>
                                <LogoNavBar/>
                            </Grid>
                            <Grid item>
                                <SearchBar/>
                            </Grid>
                            <Grid item>
                                <Avatar>M</Avatar>
                            </Grid>
                        </Grid>
                    </Container>
                </Toolbar>
            </AppBar>
        </Box>
    )
}