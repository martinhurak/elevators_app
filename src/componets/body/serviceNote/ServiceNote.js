import { useRef, useState } from "react";
import { Container, Stack } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { db } from "../../../firebase";
import { ref, set } from "firebase/database";
import { uid } from "uid";
import SetModal from "./notices/modal";
import SendDataNotification from "./notices/sendDataNotification";

function ServiceNote() {
  // Get the current date and time
  const now = new Date();
  const date = now.toLocaleDateString();
  const time = now.toLocaleTimeString();

  // Define initial state for the service data object
  const emptyServiceData = {
    id: "",
    name: "",
    street: "",
    problem: "",
    notes: "",
    isCompleted: false,
    dateAdded: date,
    timeAdded: time,
  };
  // Use state hook to manage the service data object
  const [newService, setNewService] = useState(emptyServiceData);
  // Use ref hook to track whether any required inputs are empty
  const buttonIsActive = useRef(false);
  // Function to check whether any required inputs are empty
  function checkEmptyFields() {
    for (let prop in newService) {
      if (
        typeof newService[prop] === "string" &&
        newService[prop] !== "" &&
        prop !== "dateAdded" &&
        prop !== "timeAdded"
      ) {
        return (buttonIsActive.current = false);
      }
    }
    buttonIsActive.current = true;
  }
  // Call this function on component render
  checkEmptyFields();

  // Function to update the service data object as the user types
  function handleInput(event) {
    const name = event.target.name;
    const value = event.target.value;
    setNewService((oldVal) => ({ ...oldVal, [name]: value }));
  }

  // set validation message
  const [dataNotification, setDataNotification] = useState({
    show: false,
    isSuccess: true,
  });
  // Function to write the service data to the database
  const writeToDatabase = () => {
    const uuid = uid();
    set(ref(db, `newTask/${uuid}`), {
      ...newService,
      id: uuid,
    })
      .then(() => {
        // If the write succeeds, show a success notification and reset the form
        setDataNotification({
          show: true,
          isSuccess: true,
        });
        setNewService(emptyServiceData);
      })
      // If the write fails, log the error and show an error notification
      .catch((error) => {
        console.log("Error writing data to the database: ", error);
        setDataNotification({
          show: true,
          isSuccess: false,
        });
      });
  };
  // Use state hook to manage the modal for validation errors
  const [modalShow, setModalShow] = useState(false);
  // Use state hook to manage form validation status
  const [validated, setValidated] = useState(false);
  // Function to handle form submission
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    setValidated(true);
    event.preventDefault();
    event.stopPropagation();
    // If any required inputs are empty, show the validation error modal
    if (form.checkValidity() === false) {
      setModalShow(true);
    }
    // If all inputs are valid, write the data to the database and reset the form
    if (form.checkValidity() === true) {
      writeToDatabase();
      setValidated(false);
    }
  };
  return (
    <>
      <Container>
        <Stack gap={3}>
          <h2 className="mx-auto">Pridaj záznam</h2>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} md="6">
                <Form.Label>Kto volá</Form.Label>
                <Form.Control
                  name="name"
                  value={newService.name}
                  onChange={(event) => handleInput(event)}
                  required
                  type="text"
                  placeholder="Meno"
                />
              </Form.Group>
              <Form.Group as={Col} md="6">
                <Form.Label>Odkial</Form.Label>
                <Form.Control
                  name="street"
                  value={newService.street}
                  onChange={(event) => handleInput(event)}
                  required
                  type="text"
                  placeholder="Ulica"
                />
              </Form.Group>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>Problém</Form.Label>
              <Form.Control
                name="problem"
                value={newService.problem}
                onChange={(event) => handleInput(event)}
                required
                as="textarea"
                rows={3}
                placeholder="aky je problem..."
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Poznámky</Form.Label>
              <Form.Control
                name="notes"
                value={newService.notes}
                onChange={(event) => handleInput(event)}
                as="textarea"
                rows={3}
                placeholder="poznamka k oprave..."
              />
            </Form.Group>
            <Button type="submit" disabled={buttonIsActive.current}>
              Pridaj ulohu
            </Button>
          </Form>
        </Stack>
      </Container>

      <SetModal
        setValidated={() => setValidated()}
        show={modalShow}
        sendData={() => writeToDatabase()}
        onHide={() => setModalShow(false)}
      />
      <SendDataNotification
        show={dataNotification.show}
        onHide={() => setDataNotification((data) => ({ ...data, show: false }))}
        isSuccess={dataNotification.isSuccess}
      />
    </>
  );
}

export default ServiceNote;
