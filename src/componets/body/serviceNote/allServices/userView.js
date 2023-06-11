import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faFileSignature } from "@fortawesome/free-solid-svg-icons";

import { useState } from "react";
import { Accordion, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function UserView(props) {
  const [openNotes, setOpenNotes] = useState([]);

  let isMobile = /iPhone|iPad|iPod|Android|Windows Phone/.test(
    navigator.userAgent
  );

  return props.userData.map((serviceData, index) => {
    const date = new Date(serviceData.dateAdded).toLocaleDateString();
    const time = new Date(serviceData.dateAdded).toLocaleTimeString();

    const maxWordLength = 12;
    const fullStreetName = serviceData.street;

    const displayedStreet =
      openNotes && openNotes.some((obj) => obj.isOpen === index)
        ? fullStreetName
        : fullStreetName.length > maxWordLength && isMobile
        ? fullStreetName.substring(0, maxWordLength) + "..."
        : fullStreetName;

    return (
      <Accordion key={serviceData.id} defaultActiveKey="1">
        <Accordion.Item eventKey="0">
          <Accordion.Header
            className={serviceData.isCompleted ? "complete" : "not-complete"}
          >
            <div className="header-content">
              <span>
                <b>{!serviceData.street ? "žiadne dáta" : displayedStreet}</b>
                {serviceData.workLog.isActive ? (
                  serviceData.workLog.finalizedLog ? (
                    <FontAwesomeIcon
                      icon={faCheck}
                      style={{ paddingLeft: "10px", color: "#155724" }}
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faFileSignature}
                      style={{ paddingLeft: "10px", color: "#721c24" }}
                    />
                  )
                ) : (
                  ""
                )}
              </span>
              <span>{date}</span>
            </div>
          </Accordion.Header>
          <Accordion.Body
            onEnter={() => {
              setOpenNotes((oldVal) =>
                openNotes === undefined
                  ? [{ isOpen: index }]
                  : [...oldVal, { isOpen: index }]
              );
            }}
            onExit={() => {
              setOpenNotes((oldVal) =>
                oldVal.filter((obj) => obj.isOpen !== index)
              );
            }}
            className={serviceData.isCompleted ? "complete" : "not-complete"}
          >
            <div className="body-header">
              <div>
                <b>meno:</b>
                <p>{!serviceData.name ? "žiadne dáta" : serviceData.name}</p>
              </div>
              <span>{time}</span>
            </div>
            <div>
              <b>Problém:</b>
              <p>
                {!serviceData.problem ? "žiadne dáta" : serviceData.problem}
              </p>
              <b>Poznámka :</b>
              <p>
                {!serviceData.notes ? "žiadne dáta" : serviceData.notes}
                {
                  <Button
                    className="button-change"
                    as={Link}
                    to={{
                      pathname: "/elevators_app/serviceNote",
                    }}
                    state={{
                      id: serviceData.id,
                      name: serviceData.name,
                      problem: serviceData.problem,
                      notes: serviceData.notes,
                      street: serviceData.street,
                      isEdited: true,
                      isCompleted: serviceData.isCompleted,
                      workLog: { isActive: serviceData.workLog.isActive, finalizedLog: serviceData.workLog.finalizedLog }
                    }}
                  >
                    Upraviť
                  </Button>
                }
              </p>
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    );
  });
}

export default UserView;
