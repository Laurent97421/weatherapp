import React, { Fragment, useContext, useState } from 'react';
import { Button, Box, Card, Typography, Switch, AppBar, Grid, Tabs, Icon, Tab, Avatar } from "@mui/material";
import { useNavigate } from 'react-router';
import { UserContext } from '../../contexts/user';



const Profile = () => {

    const navigate = useNavigate();

    const { mail }: any = useContext(UserContext);

    return (
        <Box>
            <Box position="relative" mb={5}>
                <Box
                    display="flex"
                    alignItems="center"
                    position="relative"
                    minHeight="18.75rem"
                    borderRadius="xl"
                />
                <Card
                    sx={{
                        position: "relative",
                        mt: -8,
                        mx: 3,
                        py: 2,
                        px: 2,
                    }}
                >
                    <Grid container spacing={3} alignItems="center">
                        <Grid item>
                            <Avatar src='https://www.nautiljon.com/images/perso/00/17/leonardo_watch_11571.webp' style={{ height: '150px', width: '150px' }} />
                        </Grid>
                        <Grid item>
                            <Box height="100%" mt={0.5} lineHeight={1}>
                                <Typography variant="h5" fontWeight="medium">
                                    Leonardo Watch
                                </Typography>
                                <Typography variant="button" color="text" fontWeight="regular">
                                    CTO / Co-Founder
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={6} lg={4} sx={{ ml: "auto" }}>
                        </Grid>
                    </Grid>
                </Card>
            </Box>
            <Card sx={{ width: '33%', marginLeft:'auto', marginRight:'auto' }}>
                <Box >
                    <Typography variant='h5'>
                        Profile Information
                    </Typography>
                    <Box
                        display="flex"
                        alignItems="center"
                        minHeight="2.75rem"
                    >
                        <Typography >
                            <strong>Fullname:</strong> Leonardo Watch
                        </Typography>
                    </Box>
                    <Box
                        display="flex"
                        alignItems="center"
                        minHeight="2.75rem"
                    >
                        <Typography >
                            <strong>Email address:</strong> {mail}
                        </Typography>
                    </Box>
                </Box>
            </Card>
            <Button onClick={() => navigate('/weather')}>Home page</Button>
        </Box>
    );
}

export default Profile;