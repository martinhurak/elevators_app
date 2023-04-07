import { onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  Overlay,
  Row,
  Stack,
} from "react-bootstrap";
import { db } from "../../../firebase";

function AllServices() {
  const [databaseData, setDatabaseData] = useState([]);
  //color lightblue

  //hover data
  const [hoveredFormId, setHoveredFormId] = useState(null);
  const showData = databaseData.map((serviceData) => (
    <Col
      md="6"
      className="p-0"
      key={serviceData.id}
      style={{ position: "relative" }}
    >
      <Form
        style={{
          opacity: hoveredFormId === serviceData.id ?0.5 :1,
          backgroundColor:
          serviceData.isCompleted === false ? "#ffc107" : "#198754",
        }}
        className="p-3 m-1"
        onMouseEnter={() => setHoveredFormId(serviceData.id)}
      >
        <Form.Group className="mb-3">
          <Form.Label>Kto volá</Form.Label>
          <Form.Control
            name="name"
            value={serviceData.name}
            //onChange={(event) => handleInput(event)}
            required
            type="text"
            placeholder="Meno"
            disabled
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Odkial</Form.Label>
          <Form.Control
            name="street"
            value={serviceData.street}
            //onChange={(event) => handleInput(event)}
            required
            type="text"
            placeholder="Ulica"
            disabled
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Problém</Form.Label>
          <Form.Control
            name="problem"
            value={serviceData.problem}
            // onChange={(event) => handleInput(event)}
            required
            as="textarea"
            style={{ resize: "none" }}
            rows={3}
            placeholder="aky je problem..."
            disabled
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Poznámky</Form.Label>
          <Form.Control
            name="notes"
            value={serviceData.notes}
            //  onChange={(event) => handleInput(event)}
            as="textarea"
            style={{ resize: "none" }}
            rows={3}
            placeholder="poznamka k oprave..."
            disabled
          />
        </Form.Group>
      </Form>
      {hoveredFormId === serviceData.id && (
        <div style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 1,
          }}>
        <Button
          variant="primary"
         
        >
          Button
        </Button>
        <Button
          variant="primary"
         
        >
          Button
        </Button>
        </div>
      )}
    </Col>
  ));

  useEffect(() => {
    onValue(ref(db, `newTask/`), (snapshot) => {
      const data = snapshot.val();
      if (data !== null) {
        const dataArray = Object.values(data);
        setDatabaseData(dataArray);
      } else {
        setDatabaseData([]);
      }
    });
  }, []);
  // console.log(databaseData);

  return (
    <>
      <Container>
        <Stack>
          <h2 className="mx-auto">All services</h2>
          <Row className="m-3">{showData}</Row>
        </Stack>
      </Container>
    </>
  );
}
export default AllServices;
// zadať čo sa stane ak niesu data v poli