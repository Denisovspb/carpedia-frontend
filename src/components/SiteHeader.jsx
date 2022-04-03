import React from 'react';
import {Link} from 'react-router-dom';
import {useQuery, gql} from "@apollo/client";

const CONCERNS = gql`
    query GetConcerns {
        concerns {
            data {
                id
                attributes {
                    name
                }
            }
        }
    }
`

export default function SiteHeader() {
    const {loading, error, data} = useQuery(CONCERNS)

    if (loading) return <p>Loading concerns...</p>
    if (error) return <p>Error: {error.message}</p>

    let concerns = [...data.concerns.data]

    return (
        <div className='site-header'>
            <Link to='/'><h1>React with strapi</h1></Link>
            <nav className='concerns'>
                <span>Filter cars by concerns:</span>
                {concerns
                    .sort((a, b) => a.attributes.name > b.attributes.name ? 1 : -1)
                    .map(concern => (
                    <Link key={concern.id} to={`/concern/${concern.id}`}>
                        {concern.attributes.name}
                    </Link>
                ))}
            </nav>
        </div>
    );
}