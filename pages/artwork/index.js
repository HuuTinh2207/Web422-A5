import { useRouter } from 'next/router';
import useSWR from 'swr';
import Error from 'next/error';
import { Container, Row, Col, Pagination, Card } from 'react-bootstrap';
import ArtWorkCard from '../../components/ArtWorkCard';
import { useState } from 'react';
import { useEffect } from 'react';
import '@/styles/Home.module.css'


const PER_PAGE = 12;
export default function ArtWork() {
    //Get the query string from the URL
    const router = useRouter();
    let finalQuery = router.asPath.split('?')[1];

    let [artWorkList, setArtWorkList] = useState(null);
    let [page, setPage] = useState(1);

    const { data, error } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/search?${finalQuery}`);
    if (error) return <Error statusCode={404} />

    const previousPage = () => {
        page > !1 && setPage(page - 1);
    }

    const nextPage = () => {
        page < artWorkList.length && setPage(page + 1);
    }

    useEffect(() => {
        console.log('This is data: ' + data)
        if (data) {
            let results = [];
            for (let i = 0; i < data?.objectIDs?.length; i += PER_PAGE) {
                const chunk = data?.objectIDs.slice(i, i + PER_PAGE);
                results.push(chunk);
            }
            setArtWorkList(results);
            console.log(artWorkList);
            setPage(1);
        }
    }, [data]);

    if (artWorkList == null) {
        return null;
    } else {
        return (
            <Container>
                <Row className='gy-4'>
                    {artWorkList.length > 0 && artWorkList[page - 1].map((currentObjectID) => (
                        <Col lg={3} key={currentObjectID}>
                            <ArtWorkCard objectID={currentObjectID} />
                        </Col>
                    ))}
                    {artWorkList.length == 0 &&
                        <Card>
                            <Card.Body>
                                <h4>Nothing Here</h4>
                                <p>Try searching for something else</p>
                            </Card.Body>
                        </Card>
                    }
                </Row>
                {/* Render Pagination */}
                {artWorkList.length > 0 &&
                    <Row style={{marginTop:"10px"}}>
                        <Col className="d-flex justify-content-center">
                            <Pagination>
                                <Pagination.Prev onClick={previousPage} />
                                <Pagination.Item>{page}</Pagination.Item>
                                <Pagination.Next onClick={nextPage} />
                            </Pagination>
                        </Col>
                    </Row>
                }
            </Container>
        )
    }
}

