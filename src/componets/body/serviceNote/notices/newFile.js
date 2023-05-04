import { Button } from "bootstrap";
import { Accordion } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function NewFile (props) {
    console.log(props.userData)
    props.userData.map((serviceData) => { 
        const date = new Date(serviceData.dateAdded).toLocaleDateString();
        const time = new Date(serviceData.dateAdded).toLocaleTimeString();
        return ( <> 
          <Accordion key={serviceData.id} defaultActiveKey="1">
            <Accordion.Item eventKey="0">
              <Accordion.Header
                className={serviceData.isCompleted ? "complete" : "not-complete"}
              >
                <div className="header-content">
                  <b>{!serviceData.street ? "žiadne dáta" : serviceData.street}</b>
                  <span>{date}</span>
                </div>
              </Accordion.Header>
              <Accordion.Body
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
                      }}
                    >
                      Upraviť
                    </Button>
                  </p>
                </div>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
          </>
        );
      });
    
}