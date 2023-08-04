import { useAtom } from 'jotai';
import { useState, useEffect } from 'react';
import { favoritesAtom } from '@/store';
import ArtWorkCard from '@/components/ArtWorkCard';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';

export default function Favorite() {
    const [favorites, setFavorites] = useAtom(favoritesAtom);
    let [artWorkList, setArtWorkList] = useState([]);
    
    useEffect(() => {
        setArtWorkList(favorites);
    }, []);
    
    if(!favorites) return null;

    return (
        <>
            <Container>
                {favorites?.length > 0 ? (
                    <>
                        <Row className="gy-4">
                            {favorites.map((currentObjectID) => (
                                <Col lg={3} key={currentObjectID}>
                                    <ArtWorkCard objectID={currentObjectID} />
                                </Col>
                            ))}
                        </Row>
                    </>
                ) : (
                    <Card>
                        <Card.Body>
                            <h4>Nothing Here</h4>
                            <p>Try adding some new artwork to the list.</p>
                        </Card.Body>
                    </Card>
                )}
            </Container>
        </>
    );
}