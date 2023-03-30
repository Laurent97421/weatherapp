import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Container, CssBaseline, Box, Avatar, Typography, TextField, FormControlLabel, Checkbox, Button, Grid, Link, Alert } from '@mui/material';
import Copyright from '../../../components/copyright/copyright';


const Login = () => {

    const navigate = useNavigate();

    const [mail, setMail] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [errorMsg, setErrorMsg] = useState<string>();

    const { handleSubmit, register, formState: { errors } } = useForm();

    const onSubmit = async (data: any) => {
        console.log(data);
        const userExist = await fetch("http://localhost:3001/auth/signin", {
            method: 'POST',
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `mail=${mail}&password=${password}`
        });

        const body = await userExist.json();
        console.log(body);


        if (body.success === true) {
            console.log('true');
            navigate('/weather');
        } else {
            console.log('false');
            setErrorMsg('Email ou mot de passe incorrecte');
        }
    }

    return (
        // <div className='row'>
        //     <form onSubmit={handleSubmit(onSubmit)}>
        //         <div className='form-group'>
        //             <label>Email :</label>
        //             <input type="email" autoComplete='off' {...register("email", { required: true })}  onChange={(e: any) => setMail(e.target.value)}/>
        //             {errors.email && <p style={{ color: 'red', paddingLeft: '2em' }}>Email is required</p>}
        //         </div>
        //         <div className='form-group'>
        //             <label>Password :</label>
        //             <input type="password" autoComplete='off' {...register("password", { required: true })}  onChange={(e: any) => setPassword(e.target.value)}/>
        //             {errors.password && <p style={{ color: 'red', paddingLeft: '2em' }}>Password is required</p>}
        //         </div>
        //         {errorMsg && <p style={{ color: 'red', paddingLeft: '2em' }}>{errorMsg}</p>}
        //         <button type='submit'>Se connecter</button>
        //         <button onClick={() => navigate('/')}>Créer un compte</button>
        //     </form>
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
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
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
                    {errorMsg && <Alert severity="error">{errorMsg}</Alert>}
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link onClick={() => navigate('/')} variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Typography variant="body2">
                                Don't have an account? {" "}
                                <Link href="/" variant="body2">
                                    {"Sign Up"}
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

export default Login;