import React from 'react';
import {useParams} from "react-router-dom";
import {useQuery, gql} from "@apollo/client";

const CAR = gql`
    query GetCar($id: ID!) {
        car(id: $id) {
            data {
                id,
                attributes {
                    name,
                    description,
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
`

export default function CarDetails() {
    const {id} = useParams()
    const {loading, error, data} = useQuery(CAR, {
        variables: {id: id}
    })

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error</p>

    let carData = data.car.data.attributes;
    let concernData = carData.concern.data.attributes;

    return (
        <div>
            <h2>Car brand: {carData.name}</h2>
            <h4>Concern: {concernData.name}</h4>
            <p>{carData.description}</p>
        </div>
    );
}