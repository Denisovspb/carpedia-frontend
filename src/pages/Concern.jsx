import React from 'react';
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

export default function Concern() {
    const {loading,error,data} = useQuery(CONCERN)

    return (
        <div>
        {/*    TODO: there will be filtered by concerns info about car brands */}
        </div>
    );
}