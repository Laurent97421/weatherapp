import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router"
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { Container, CssBaseline, Box, Avatar, Typography, TextField, FormControlLabel, Checkbox, Button, Grid, Link, Alert } from '@mui/material';
import Copyright from '../../../components/copyright/copyright';

const Signup = () => {

    const navigate = useNavigate();

    const [username, setUsername] = useState();
    const [mail, setMail] = useState();
    const [password, setPassword] = useState();
    const [errorMsg, setErrorMsg] = useState<string>();

    const { handleSubmit, register, formState: { errors } } = useForm();
    const onSubmit = async (data: any) => {

        const saveUser = await fetch("http://localhost:3001/auth/signup", {
            method: 'POST',
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `username=${username}&mail=${mail}&password=${password}`
        });

        const body = await saveUser.json();
        console.log(body);


        if (body.success === true) {
            console.log('true');
            navigate('/login');
        } else {
            console.log('false');
            setErrorMsg('Cet email est déjà utilisé');
        }


    }

    return (
        // <div className='row'>
        //     <form onSubmit={handleSubmit(onSubmit)}>
        //         <div className='form-group'>
        //             <label>Name :</label>
        //             <input type="text" autoComplete='off' {...register("name", { required: true })} onChange={(e: any) => setUsername(e.target.value)} />
        //             {errors.name && <p style={{ color: 'red', paddingLeft: '2em' }}>Name is required</p>}
        //         </div>
        //         <div className='form-group'>
        //             <label>Email :</label>
        //             <input type="email" autoComplete='off' {...register("email", { required: true })} onChange={(e: any) => setMail(e.target.value)} />
        //             {errors.email && <p style={{ color: 'red', paddingLeft: '2em' }}>Email is required</p>}
        //         </div>
        //         <div className='form-group'>
        //             <label>Password :</label>
        //             <input type="password" autoComplete='off' {...register("password", { required: true })} onChange={(e: any) => setPassword(e.target.value)} />
        //             {errors.password && <p style={{ color: 'red', paddingLeft: '2em' }}>Password is required</p>}
        //         </div>
        //         {errorMsg && <p style={{ color: 'red', paddingLeft: '2em' }}>{errorMsg}</p>}
        //         <button type='submit'>Créer un compte</button>
        //     </form>
        //     <div>
        //         <p>Vous avez déjà un compte ?</p>
        //         <button onClick={() => navigate("/login")}>Connectez-vous</button>
        //     </div>
        // </div>
        <Container>
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >

                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOpenIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="text"
                        label="Name"
                        type="text"
                        autoComplete="off"
                        autoFocus
                        {...register("name", { required: true })} 
                        onChange={(e: any) => setUsername(e.target.value)}
                    />

                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        type="email"
                        autoComplete="off"
                        autoFocus
                        {...register("email", { required: true })}
                        onChange={(e: any) => setMail(e.target.value)}
                    />

                    {errors.email && <Alert severity="error"> Email is required</Alert>}
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="off"
                        {...register("password", { required: true })}
                        onChange={(e: any) => setPassword(e.target.value)}
                    />
                    {errors.password && <Alert severity="error"> Password is required</Alert>}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign Up
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Typography variant="body2">
                                Already have an account? {" "}
                                <Link href="/login" variant="body2">
                                    {"Sign In"}
                                </Link>
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
    )
}

export default Signup;