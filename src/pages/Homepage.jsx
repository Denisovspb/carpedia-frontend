import React from 'react';
import {Link} from 'react-router-dom';
import {useQuery, gql} from "@apollo/client";

const CARS = gql`
    query GetCars {
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
`

function Homepage() {
    const {loading, error, data} = useQuery(CARS)

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error</p>

    console.log(data)

    return (
        <div>
            {data.cars.data.map(car => {
                let carData = car.attributes;
                let concernData = carData.concern.data.attributes
                let carImage = 'http://localhost:1337' + carData.image.data[0].attributes.url

                return (<div key={car.id} className='car-card'>
                    <div className="car-image">
                        <img src={carImage} alt="Car"/>
                    </div>
                    <div className="car-description">
                        <h2>Марка: {carData.name}</h2>
                        <h4>Производитель: {concernData.name}</h4>
                        <Link to={`/cars/${car.id}`}>Read more</Link>
                    </div>
                </div>)
            })}
        </div>
    );
}

export default Homepage;