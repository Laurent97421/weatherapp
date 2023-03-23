import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form';
import 'bootstrap/dist/css/bootstrap.min.css';

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

    // TODO: add lu-ks to github repo 
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
        <div className='container' style={{ display: 'flex' }}>
            Weather Page
            <div className='row' style={{ flexDirection: 'row' }}>
                <div className='col-12 offset-lg-6 col-lg-6' style={{ textAlign: 'center' }}>

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
                            <li key={city._id}>
                                {city.name}
                                <div>
                                    <img src={city.img} alt="img" />
                                    <span className='badge bg-warning '>{city.temp_max}°C</span>
                                    <span className='badge bg-secondary'>{city.temp_min}°C</span>
                                    <button className="btn btn-danger btn-sm" type="button" data-toggle="tooltip"
                                        data-placement="top" title="Delete" onClick={() => handleDelete(city._id)}>x</button>
                                </div>
                            </li>
                        )
                    }
                    )}
                </div>
            </div>

        </div>
    )
}

export default Weather;