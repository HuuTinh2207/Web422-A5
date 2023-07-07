import React from "react";
import { useRouter } from "next/router"
import { Container, Row, Col, Pagination, Card } from 'react-bootstrap';
import ArtworkCardDetail from "@/components/ArtWorkCardDetail";

export default function ArtWorkByID() {
    const router = useRouter();
    const { objectID } = router.query;

    return (
        <Row>
            <Col className="">
                <ArtworkCardDetail objectID={objectID} />
            </Col>
        </Row>
    )
}