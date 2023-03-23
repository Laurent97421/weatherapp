import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router";

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
        <div className='row'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='form-group'>
                    <label>Name :</label>
                    <input type="text" autoComplete='off' {...register("name", { required: true })} onChange={(e: any) => setUsername(e.target.value)} />
                    {errors.name && <p style={{ color: 'red', paddingLeft: '2em' }}>Name is required</p>}
                </div>
                <div className='form-group'>
                    <label>Email :</label>
                    <input type="email" autoComplete='off' {...register("email", { required: true })} onChange={(e: any) => setMail(e.target.value)} />
                    {errors.email && <p style={{ color: 'red', paddingLeft: '2em' }}>Email is required</p>}
                </div>
                <div className='form-group'>
                    <label>Password :</label>
                    <input type="password" autoComplete='off' {...register("password", { required: true })} onChange={(e: any) => setPassword(e.target.value)} />
                    {errors.password && <p style={{ color: 'red', paddingLeft: '2em' }}>Password is required</p>}
                </div>
                {errorMsg && <p style={{ color: 'red', paddingLeft: '2em' }}>{errorMsg}</p>}
                <button type='submit'>Créer un compte</button>
            </form>
            <div>
                <p>Vous avez déjà un compte ?</p>
                <button onClick={() => navigate("/login")}>Connectez-vous</button>
            </div>
        </div>
    )
}

export default Signup;