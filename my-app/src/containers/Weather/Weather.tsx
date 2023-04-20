import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form';
import 'bootstrap/dist/css/bootstrap.min.css';
import Leaflet from '../../components/leaflet/leaflet';
import { useNavigate } from 'react-router';
import { Container, CssBaseline, Box, Avatar, Typography, TextField, FormControlLabel, Checkbox, Button, Grid, Link, Alert, Card, IconButton, CardContent } from '@mui/material';

interface City {
    _id: string,
    name: string,
    weather: string,
    img: string,
    temp_min: number,
    temp_max: number,
    lon: number,
    lat: number
}

const Weather = () => {

    const navigate = useNavigate();

    const [cities, setCities] = useState<City[]>([]);
    const [addCity, setAddCity] = useState<string>();

    const { handleSubmit, register, formState: { errors } } = useForm();

    const onSubmit = () => {
        fetch("http://localhost:3001/weather/add-city", {
            method: 'POST',
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `city=${addCity}`
        })
            .then((response) => response.json())
            .then((data) => setCities(data.cityList))
            .catch((error) => console.log(error))
    }

    useEffect(() => {
        fetch('http://localhost:3001/weather')
            .then((response) => response.json())
            .then((data) => {
                setCities(data.cityList);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const handleDelete = (id: string) => {
        fetch(`http://localhost:3001/weather/delete/${id}`, {
            method: 'DELETE',
        })
            .then((response) => response.json())
            .then((data) => setCities(data.cityList))
    }

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
                <Leaflet cities={cities} />
            </Grid>
            <Grid item xs={12} md={6}>
                <div style={{ textAlign: 'center' }}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className='form-group'>
                            <input type="text" autoComplete='off' {...register("addCity", { required: true })} onChange={(e: any) => setAddCity(e.target.value)} placeholder="Enter city name" />
                            {errors.addCity && <p style={{ color: 'red', paddingLeft: '2em' }}>Enter a city name before sending the request</p>}
                            <div className="input-group-append">
                                <button className="btn btn-warning" type="submit" id="button-addon2">Add</button>
                            </div>
                        </div>
                    </form>
                    {cities && cities.map((city: City) => {
                        return (
                            <ul key={city._id}>
                                <Card sx={{ maxWidth: 350 }}>
                                    <CardContent>
                                        <Box sx={{ textAlign: 'right' }}>
                                            <button className="btn btn-danger btn-sm" type="button" data-toggle="tooltip"
                                                data-placement="top" title="Delete" onClick={() => handleDelete(city._id)} style={{
                                                }}>x</button>
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <IconButton sx={{ mr: 1 }}>
                                                <img src={city.img} alt="img" />
                                            </IconButton>
                                            <Typography variant="h6" component="div">
                                                {city.name}
                                            </Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                                            <Typography variant="body1" component="div">
                                                Température Max/Min
                                            </Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                                            <Typography className='badge bg-warning' variant="h6" component="div" sx={{ mr: 1 }}>
                                                {city.temp_max}°C
                                            </Typography>
                                            <Typography className='badge bg-secondary' variant="h6" component="div" sx={{ mr: '10px' }}>
                                                {city.temp_min}°C
                                            </Typography>

                                        </Box>
                                    </CardContent>
                                </Card>
                            </ul>
                        )
                    })}
                </div>
                <Button onClick={() => navigate('/profile')}>My profile</Button>
            </Grid>
        </Grid>
    )
}

export default Weather;