import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function SetModal(props) {
  // Function to handle user validation
  function userValidation(event) {
    const userChoice = event.target.value;
    if (userChoice === "yes") {
      props.sendData();
      props.setValidated(true);
    }
    props.onHide();
  };
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
        <h4>Chybajuce údaje</h4>
        <span>Pridať záznam?</span>
      </Modal.Body>
      <Modal.Footer>
        <Button value={"yes"} onClick={(event) => userValidation(event)}>
          Áno
        </Button>
        <Button value={"no"} onClick={(event) => userValidation(event)}>
          Nie
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
export default SetModal;
