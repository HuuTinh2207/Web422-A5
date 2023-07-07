import React from 'react';
import useSWR from 'swr';
import Error from 'next/error';
import { Card } from 'react-bootstrap';


export default function ArtWorkCardDetail({ objectID }) {
    const { data, error } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`);

    if (error) {
        return <Error statusCode={404} />
    } else {
        if (!data) {
            return null;
        }
        else {
            return (
                <Card style={{ width: '18rem' }}>
                    {data.primaryImage && <Card.Img variant="top" src={data.primaryImage} />}
                    <Card.Body>
                        {data.title ? <Card.Title>{data.title}</Card.Title> : <Card.Title>N/A</Card.Title>}
                        <Card.Text>
                            {data.objectDate ? <p>{data.objectDate}</p> : <p>N/A</p>}
                            {data.classification ? <p>{data.classification}</p> : <p>N/A</p>}
                            {data.medium ? <p>{data.medium}</p> : <p>N/A</p>}
                            <br />
                            <br />
                            {data.artistDisplayName ?
                                <span>
                                    <p>Artist: {data.artistDisplayName} &nbsp;
                                    {data.artistWikidata_URL != "" && <a href={data.artistWikidata_URL} target="_blank" rel="noreferrer" >wiki</a>}
                                    </p>
                                </span>
                                : <p>N/A</p>}
                            {data.creditLine ? <p>{data.creditLine}</p> : <p>N/A</p>}
                            {data.dimensions ? <p>{data.dimensions}</p> : <p>N/A</p>}
                        </Card.Text>
                    </Card.Body>
                </Card>
            );
        }
    }
}