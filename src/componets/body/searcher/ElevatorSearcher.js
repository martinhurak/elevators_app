import { Col, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
function ElevatorSearcher(props) {
  return (
    <>
      <Form>
        <Row>
          <Col sm={6}>
            <Form.Control
              className="mb-3"
              type="search"
              placeholder="hladaj..."
              onChange={(event) =>
                props.setSearch((oldVal) => ({
                  ...oldVal,
                  expression: event.target.value,
                }))
              }
            />
          </Col>
          <Col sm={6}>
            <Form.Select
              aria-label="allCategory"
              defaultValue={"allCategory"}
              onChange={(event) =>
                props.setSearch((oldVal) => ({
                  ...oldVal,
                  category: event.target.value,
                }))
              }
            >
              <option value="allCategory">všetky kategorie</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </Form.Select>
          </Col>
        </Row>
      </Form>
    </>
  );
}

export default ElevatorSearcher;
