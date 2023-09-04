import classes from "./AboutUs.module.css"
import { Container, Row, Col } from "react-bootstrap"
import img_1 from "./img_1.png"

export default function AboutUs() {
    return (

        <Container className={classes.div} expand="sm">
            <Row expand="lg">
                <Col expand="lg">
                    <h1 className={classes.h1} >Lorem Ipsum is simply dummy text of the printing and.</h1>
                    <p className={classes.p}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>

                </Col>
            </Row>

            <Row expand="lg">
                <Col>
                    <img className={classes.img} src={img_1} alt={img_1}></img>
                </Col>
            </Row>

        </Container>

    )
}