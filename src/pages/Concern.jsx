import React from 'react';
import {Link, useParams} from "react-router-dom";
import {useQuery, gql} from "@apollo/client";

const CONCERN = gql`
    query GetConcern($id: ID!) {
        concern(id: $id) {
            data {
                id,
                attributes {
                    name,
                    cars {
                        data {
                            id,
                            attributes {
                                name,
                                image {
                                    data {
                                        attributes {
                                            url
                                        }
                                    }
                                },
                                concern {
                                    data {
                                        attributes {
                                            name
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`

export default function Concern() {
    const {id} = useParams()
    const {loading, error, data} = useQuery(CONCERN, {
        variables: {id: id}
    })

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error</p>

    let cars = [...data.concern.data.attributes.cars.data]

    return (
        <div>
            {cars
                .sort((a, b) => a.attributes.name > b.attributes.name ? 1 : -1)
                .map(car => {
                    let carData = car.attributes;
                    let concernData = carData.concern.data.attributes
                    let carImage = 'http://localhost:1337' + carData.image.data[0].attributes.url

                    return (
                        <div key={car.id} className='car-card'>
                            <div className="car-image">
                                <img src={carImage} alt="Car"/>
                            </div>
                            <div className="car-description">
                                <h2>Car brand: {carData.name}</h2>
                                <h4>Concern: {concernData.name}</h4>
                                <Link to={`/cars/${car.id}`}>Read more</Link>
                            </div>
                        </div>
                    )
                })}
        </div>
    );
}