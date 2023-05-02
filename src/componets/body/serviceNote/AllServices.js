import { onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import {
  Accordion,
  Button,
  Container,
  Pagination,
  Stack,
} from "react-bootstrap";
import AccordionBody from "react-bootstrap/esm/AccordionBody";
import AccordionHeader from "react-bootstrap/esm/AccordionHeader";
import AccordionItem from "react-bootstrap/esm/AccordionItem";
import { Link } from "react-router-dom";
import { db } from "../../../firebase";
import "./allServices.css";

function AllServices() {
  const [databaseData, setDatabaseData] = useState([]);

  useEffect(() => {
    onValue(ref(db, `newTask/`), (snapshot) => {
      const data = snapshot.val();
      if (data !== null) {
        const dataArray = Object.values(data);
        //console.log(dataArray)
        const dataFormat = dataArray.sort(
          (date1, date2) =>
            new Date(date2.dateAdded) - new Date(date1.dateAdded)
        );

        setDatabaseData(dataFormat);
        setUserData(dataFormat.slice(0, 10));
      } else {
        setDatabaseData([]);
      }
    });
  }, []);

  const [userData, setUserData] = useState(databaseData);
  //pagination

  let [activePage, setActivePage] = useState(1);
  let items = [];
  const numResults = 10;

  const paginationHandler = (number) => {
    setActivePage(number);
    const startIndex = (number - 1) * numResults;
    const endIndex = number * numResults;
    console.log(startIndex, endIndex);
    setUserData(databaseData.slice(startIndex, endIndex));
  };

  const totalPages = Math.ceil(databaseData.length / numResults);
  const lastPage = totalPages;

  const paginationStart = activePage === 1 ? 1 : activePage - 1;
  const paginationEnd = activePage === lastPage ? lastPage : activePage + 1;

  for (let number = paginationStart; number <= paginationEnd; number++) {
    items.push(
      <Pagination.Item
        onClick={() => paginationHandler(number)}
        key={number}
        active={number === activePage}
      >
        {number}
      </Pagination.Item>
    );
  }

  // uprv stanku ku prvej a poslednej
  const showData = userData.map((serviceData) => {
    const date = new Date(serviceData.dateAdded).toLocaleDateString();
    const time = new Date(serviceData.dateAdded).toLocaleTimeString();
    return (
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
    );
  });

  return (
    <>
      {" "}
      {/* <Accordion>
        {" "}
        <AccordionItem>
          <AccordionHeader>Rozsirene možnosti domysli to</AccordionHeader>
          <AccordionBody>ss</AccordionBody>
        </AccordionItem>
  </Accordion> */}
      <Container>
        <Stack>
          <h2 className="mx-auto mb-4">Všetky záznamy</h2>
          {showData}
        </Stack>
        <Pagination className="mt-4 pagination justify-content-center">
          <Pagination.First onClick={() => paginationHandler(1)} />

          {items}

          <Pagination.Last onClick={() => paginationHandler(lastPage)} />
        </Pagination>
      </Container>
    </>
  );
}
export default AllServices;

// upraviť nazov možno aj umiestnenie css // asi ok možno vlastnu zolložku
// nazvy premennych
//co bude napisane ak su polia prazne "" napr ziadne data //ok
