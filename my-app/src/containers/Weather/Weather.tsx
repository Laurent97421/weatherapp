import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form';
import 'bootstrap/dist/css/bootstrap.min.css';
import Leaflet from '../../components/leaflet/leaflet';

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
            <Leaflet cities={cities} />
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
// function App() {
//     return (
//         <MDBContainer fluid>
//             <MDBRow>

//                 <MDBCol sm='6'>

//                     <div className='d-flex flex-row ps-5 pt-5'>
//                         <MDBIcon fas icon="crow fa-3x me-3" style={{ color: '#709085' }} />
//                         <span className="h1 fw-bold mb-0">Logo</span>
//                     </div>

//                     <div className='d-flex flex-column justify-content-center h-custom-2 w-75 pt-4'>

//                         <h3 className="fw-normal mb-3 ps-5 pb-3" style={{ letterSpacing: '1px' }}>Log in</h3>

//                         <MDBInput wrapperClass='mb-4 mx-5 w-100' label='Email address' id='formControlLg' type='email' size="lg" />
//                         <MDBInput wrapperClass='mb-4 mx-5 w-100' label='Password' id='formControlLg' type='password' size="lg" />

//                         <MDBBtn className="mb-4 px-5 mx-5 w-100" color='info' size='lg'>Login</MDBBtn>
//                         <p className="small mb-5 pb-lg-3 ms-5"><a className="text-muted" href="#!">Forgot password?</a></p>
//                         <p className='ms-5'>Don't have an account? <a href="#!" className="link-info">Register here</a></p>

//                     </div>

//                 </MDBCol>

//                 <MDBCol sm='6' className='d-none d-sm-block px-0'>
//                     <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img3.webp"
//                         alt="Login image" className="w-100" style={{ objectFit: 'cover', objectPosition: 'left' }} />
//                 </MDBCol>

//             </MDBRow>

//         </MDBContainer>
//     );
// }

// export default App;