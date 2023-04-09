import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";

function SetModal(props) {
  // Function to handle user validation
  function userValidation(event) {
    const userChoice = event.target.value;
    if (userChoice === "yes") {
      if (props.isDeleted === true) {
        props.handleDelete();
        console.log("ok");
      }
      if (props.isDeleted === false) {
        props.sendData();
        props.setValidated(true);
      }
    }
    props.onHide();
    props.setIsDeleted(false);
  }
  return (
    <Modal
      onHide={() => props.onHide()}
      show={props.show}
      aria-labelledby="contained-modal-title-vcenter"
      backdrop="static"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Varovanie</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>{props.isDeleted ? "Si si istý? " : "Chybajuce údaje"}</h4>
        <span>{props.isDeleted ? "Vymazať záznam" : "Pridať záznam?"} </span>
      </Modal.Body>
      <Modal.Footer>
        {props.isDeleted ? (
          <Link to="../elevator_app/allServices">
            <Button value={"yes"} onClick={(event) => userValidation(event)}>
              Áno
            </Button>
          </Link>
        ) : (
          <Button value={"yes"} onClick={(event) => userValidation(event)}>
            Áno
          </Button>
        )}

        <Button value={"no"} onClick={(event) => userValidation(event)}>
          Nie
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
export default SetModal;
