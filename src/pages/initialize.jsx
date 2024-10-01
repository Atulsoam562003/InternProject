import React from "react";
import { Row, Button, CardGroup, Card, Container } from "react-bootstrap";
import { Col } from "react-bootstrap";

class Initialize extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      zone: [],
    };
  }

  componentDidMount() {
    localStorage.getItem("loggedinUser");
    fetch("http://localhost:3005/api/getZone")
      .then((res) => res.json())
      .then((res) => {
        this.setState({ zone: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  createZone() {
    fetch("http://localhost:3005/api/createZone")
      .then((res) => res.json())
      .then((res) => {
        if (res.success === true) {
          let zoneState = [...this.state.zone, res.data];
          this.setState({ zone: zoneState });
        }
      });
  }

  deleteZone() {
    fetch("http://localhost:3005/api/deleteZone")
      .then((res) => res.json())
      .then((res) => {
        if (res.success === true) {
          let zoneState = this.state.zone.slice(0, -1); // Remove the last element
          this.setState({ zone: zoneState });
        }
      });
  }

  render() {
    let { zone } = this.state;
    return (
      <Container>
        <h3>Initialize new parking lot here...</h3>
        <Row>
          <Col>
            {zone.length <= 25 && (
              <Button
                className="mlr-10"
                variant="outline-primary"
                onClick={this.createZone.bind(this)}
              >
                Create Parking Zone
              </Button>
            )}
            {zone.length > 1 && (
              <Button
                className="mlr-10"
                variant="outline-danger"
                onClick={this.deleteZone.bind(this)}
              >
                Delete Parking Zone
              </Button>
            )}
          </Col>
        </Row>
        <CardGroup className="parking-space-list">
          {zone.map((v, i) => (
            <Card key={i} className="parking-item available">
              <Card.Body>
                <Card.Text>{v.parking_zone_id}</Card.Text>
              </Card.Body>
            </Card>
          ))}
        </CardGroup>
      </Container>
    );
  }
}

export default Initialize;
