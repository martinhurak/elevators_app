import { onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { Accordion, Container, Stack } from "react-bootstrap";
import { db } from "../../../firebase";
import "./myCss.css";

function AllServices() {
  const [databaseData, setDatabaseData] = useState([]);
  //color lightblue
  const showData = databaseData.map((serviceData) => (
    <Accordion key={serviceData.id} defaultActiveKey="1">
      <Accordion.Item eventKey="0">
        <Accordion.Header
          className={serviceData.isCompleted ? "complete" : "not-complete"}
        >
          <div
            className="header-content"
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100% ",
              padding: "0% 2%",
            }}
          >
            <span style={{ fontWeight: "bold" }}> {serviceData.street}</span>
            <span>{serviceData.dateAdded}</span>
          </div>
        </Accordion.Header>
        <Accordion.Body
          className={serviceData.isCompleted ? "complete" : "not-complete"}
        >
        
            {/** uprav  skus hodiť na git uvidiš na mobile kde sa ti nejlešie hodi "upraviť butt "*/}
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <b >Problém:</b>
              <span>{serviceData.timeAdded}</span>
            </div>
            <div>
              <p>{serviceData.problem}</p>
              <b>Poznámka :</b>
              <p>{serviceData.notes}</p>
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
  // console.log(databaseData);

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
// zadať čo sa stane ak niesu data v poli
