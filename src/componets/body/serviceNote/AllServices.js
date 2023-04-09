import { onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { Accordion, Button, Container, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import { db } from "../../../firebase";
import "./allServices.css";


function AllServices() {
  const [databaseData, setDatabaseData] = useState([]);

  const showData = databaseData.map((serviceData) => (
    <Accordion key={serviceData.id} defaultActiveKey="1">
      <Accordion.Item eventKey="0">
        <Accordion.Header
          className={serviceData.isCompleted ? "complete" : "not-complete"}
        >
          <div className="header-content">
            <b>
              {" "}
              {serviceData.street === "" ? "žiadne dáta" : serviceData.street}
            </b>
            <span>{serviceData.dateAdded}</span>
          </div>
        </Accordion.Header>
        <Accordion.Body
          className={serviceData.isCompleted ? "complete" : "not-complete"}
        >
          <div className="body-header">
            <div>
              <b>meno:</b>
              <p>{serviceData.name}</p>
            </div>
            <span>{serviceData.timeAdded}</span>
          </div>
          <div>
            <b>Problém:</b>
            <p>
              {serviceData.problem === "" ? "žiadne dáta" : serviceData.problem}
            </p>
            <b>Poznámka :</b>
            <p>
              {serviceData.notes === "" ? "žiadne dáta" : serviceData.notes}
              <Button
                as={Link}
                to={{
                  pathname: "/elevator_app/serviceNote",
                }}
                state={{        
                  id:serviceData.id,
                  name: serviceData.name,
                  problem: serviceData.problem,
                  notes: serviceData.notes,
                  street: serviceData.street,
                  isEdited:true,
                  isCompleted:serviceData.isCompleted
                }}
                style={{ float: "right" }}
              >
                Upraviť
              </Button>
            </p>
          </div>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
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

  return (
    <>
      <Container>
        <Stack>
          <h2 className="mx-auto mb-4">Všetky záznamy</h2>
          {showData}
        </Stack>
      </Container>
    </>
  );
}
export default AllServices;

// upraviť nazov možno aj umiestnenie css // asi ok možno vlastnu zolložku 
// nazvy premennych
//co bude napisane ak su polia prazne "" napr ziadne data //ok
// nemaš meno // ok 


// vytvor na novo cele css  dopičeee 
