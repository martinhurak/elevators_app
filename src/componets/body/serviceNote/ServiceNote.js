import { useEffect, useRef, useState } from "react";
import { Container, Stack } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { db } from "../../../firebase";
import { ref, remove, set, update } from "firebase/database";
import { uid } from "uid";
import SetModal from "./notices/modal";
import SendDataNotification from "./notices/sendDataNotification";
import { useLocation } from "react-router-dom";
import "./newService.css";

function ServiceNote() {
  // Get the current date and time
  const now = new Date();
  const dateFormat = now.toUTCString()

  // Get data to edited
  const location = useLocation();
  const { id, name, street, problem, notes, isEdited, isCompleted } =
    location.state;
  // Define initial state
  const updatedData = {
    id: id,
    name: name,
    street: street,
    problem: problem,
    notes: notes,
    isCompleted: isCompleted,
  };
  const initialServiceData = {
    id: "",
    name: "",
    street: "",
    problem: "",
    notes: "",
    isCompleted: false,
    dateAdded: dateFormat, 
  };

  // Use state hook to manage the service data object
  const [newService, setNewService] = useState(initialServiceData);

  //Set initial state based on user input
  useEffect(() => {
    if (isEdited === true) {
      setNewService(updatedData);
    } else {
      setNewService(initialServiceData);
    }
    // eslint-disable-next-line
  }, [isEdited]);

  // Use ref hook to track whether any required inputs are empty
  const buttonIsActive = useRef(false);
  // Function to check whether any required inputs are empty
  function checkEmptyFields() {
  // this inputs must have value
    const { name, street, problem, notes } = newService;
    if (name || street || problem || notes) {
      return (buttonIsActive.current = true);
    }
    buttonIsActive.current = false;
  }
  // Call this function on component render
  checkEmptyFields();

  // Function to update the service data object as the user types
  function handleInput(event) {
    const name = event.target.name;
    const value = event.target.value;
    const type = event.target.type;
    const checked = event.target.checked;

    setNewService((oldVal) =>
      type === "checkbox"
        ? { ...oldVal, isCompleted: checked }
        : { ...oldVal, [name]: value }
    );
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
        setNewService(initialServiceData);
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
  // Function to Update the service data to the database
  const UpdateToDatabase = () => {
    update(ref(db, `newTask/${updatedData.id}`), {
      ...newService,
    })
      .then(() => {
        // If the update succeeds, show a success notification and reset the form
        setDataNotification({
          show: true,
          isSuccess: true,
        });
      })
      // If the update fails, log the error and show an error notification
      .catch((error) => {
        console.log("Error writing data to the database: ", error);
        setDataNotification({
          show: true,
          isSuccess: false,
        });
      });
  };

  //delete datebase
  const [isDeleted, setIsDeleted] = useState(false);
  const setDeleteModal = () => {
    setIsDeleted(true);
    setModalShow(true);
  };

  const handleDelete = () => {
    remove(ref(db, `newTask/${updatedData.id}`));
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
      isEdited ? UpdateToDatabase() : writeToDatabase();
      setValidated(false);
    }
  };

  return (
    <>
      <Container className="mt-3">
        <Stack gap={3}>
          <h2 className="mx-auto">
            {isEdited ? "Zmena záznamu" : "Pridaj záznam"}{" "}
          </h2>
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
            <Form.Check
              className="mb-3"
              id="switch"
              type="switch"
              checked={newService.isCompleted}
              label={
                <Form.Check.Label className="prevent-select" htmlFor="switch">
                  {newService.isCompleted ? "Splnené" : "V spracovaní"}
                </Form.Check.Label>
              }
              onChange={(event) => handleInput(event)}
            ></Form.Check>

            <Row>
              <Col>
                <Button
                  style={{ width: "100%" }}
                  type="submit"
                  disabled={!buttonIsActive.current}
                >
                  {isEdited ? "Uprav" : "Pridaj záznam"}
                </Button>
              </Col>

              {isEdited && (
                <Col>
                  <Button
                    onClick={() => setDeleteModal()}
                    style={{ width: "100%" }}
                    variant="danger"
                  >
                    vymaž záznam
                  </Button>
                </Col>
              )}
            </Row>
          </Form>
        </Stack>
      </Container>

      <SetModal
        setValidated={() => setValidated()}
        show={modalShow}
        sendData={() => (isEdited ? UpdateToDatabase() : writeToDatabase())}
        onHide={() => setModalShow(false)}
        isDeleted={isDeleted}
        setIsDeleted={() => setIsDeleted()}
        handleDelete={() => handleDelete()}
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


