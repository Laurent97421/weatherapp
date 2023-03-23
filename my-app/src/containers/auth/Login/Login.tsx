import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router";


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
        <div className='row'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='form-group'>
                    <label>Email :</label>
                    <input type="email" autoComplete='off' {...register("email", { required: true })}  onChange={(e: any) => setMail(e.target.value)}/>
                    {errors.email && <p style={{ color: 'red', paddingLeft: '2em' }}>Email is required</p>}
                </div>
                <div className='form-group'>
                    <label>Password :</label>
                    <input type="password" autoComplete='off' {...register("password", { required: true })}  onChange={(e: any) => setPassword(e.target.value)}/>
                    {errors.password && <p style={{ color: 'red', paddingLeft: '2em' }}>Password is required</p>}
                </div>
                {errorMsg && <p style={{ color: 'red', paddingLeft: '2em' }}>{errorMsg}</p>}
                <button type='submit'>Se connecter</button>
                <button onClick={() => navigate('/')}>Créer un compte</button>
            </form>
        </div>
    )
}

export default Login;