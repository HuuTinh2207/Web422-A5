import React from 'react';
import { Button, Card } from 'react-bootstrap';
import useSWR from 'swr';
import Error from 'next/error';
import Link from 'next/link';

export default function ArtWorkCard({ objectID }) {
    //First thing is to make a call to the API to get the data for the objectID by using the useSWR hook
    const { data, error } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`);

    if (error) return <Error statusCode={404} />
    if (!data) {
        return null;
    } else {
        return (
            <>
                <Card className='card'>
                    {data.primaryImageSmall ? <Card.Img variant="top" src={data.primaryImageSmall} /> : <Card.Img variant="top" src="https://via.placeholder.com/375x375.png?text=[+Not+Available+]" />}
                    <Card.Body>
                        {data.title ? <Card.Title>{data.title}</Card.Title> : <Card.Title>N/A</Card.Title>}
                        <Card.Text>
                            {data.objectDate ? <p>{data.objectDate}</p> : <p>N/A</p>}
                            {data.classification ? <p>{data.classification}</p> : <p>N/A</p>}
                            {data.medium ? <p>{data.medium}</p> : <p>N/A</p>}
                            <Link passHref legacyBehavior href={`/artwork/${objectID}`}>
                                <div>
                                <Button variant="primary">{objectID}</Button>
                                </div>
                            </Link>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </>
        );
    }
}

