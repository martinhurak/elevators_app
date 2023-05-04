import { onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import {
  Accordion,
  Button,
  ButtonGroup,
  Container,
  Pagination,
  Stack,
} from "react-bootstrap";

import { Link } from "react-router-dom";
import { db } from "../../../firebase";
import "./allServices.css";

import ThreeDots from "react-loading-icons/dist/esm/components/three-dots";

function AllServices() {
  const [databaseData, setDatabaseData] = useState([]);

  useEffect(() => {
    onValue(ref(db, `newTask/`), (snapshot) => {
      const data = snapshot.val();
      if (data !== null) {
        const dataArray = Object.values(data);
        const dataFormat = dataArray.sort(
          (date1, date2) =>
            new Date(date2.dateAdded) - new Date(date1.dateAdded)
        );

        setDatabaseData(dataFormat);
        setUserData(dataFormat.slice(0, 10));
        setcategoryData(dataFormat);
      } else {
        setDatabaseData([]);
      }
      
    });
  }, []);

  const [userData, setUserData] = useState(databaseData);

  // hladanie podla kategorie

  const [activeCategory, setActiveCategory] = useState("allCategory");
  const [categoryData, setcategoryData] = useState(databaseData);

  let [activePage, setActivePage] = useState(1);
  useEffect(() => {
    const startIndex = (activePage - 1) * numResults;
    const endIndex = activePage * numResults;
    setUserData(categoryData.slice(startIndex, endIndex));
  }, [activePage, categoryData]);

  const categoryFilter = (selectedCategory) => {
    if (selectedCategory === "complete") {
      setcategoryData(databaseData.filter((a) => a.isCompleted === true));

      setActiveCategory("complete");
    }
    if (selectedCategory === "inProgress") {
      setcategoryData(databaseData.filter((a) => a.isCompleted === false));

      setActiveCategory("inProgress");
    }
    if (selectedCategory === "allCategory") {
      setcategoryData(databaseData);
      setActiveCategory("allCategory");
    }
    paginationHandler(1);
  };

  //pagination

  let items = [];
  const numResults = 10;

  const paginationHandler = (PageNumber) => {
    setActivePage(PageNumber);
  };

  const totalPages = Math.ceil(categoryData.length / numResults);
  const lastPage = totalPages;

  const paginationStart = activePage === 1 ? 1 : activePage - 1;
  const paginationEnd = activePage === lastPage ? lastPage : activePage + 1;

  for (
    let PageNumber = paginationStart;
    PageNumber <= paginationEnd;
    PageNumber++
  ) {
    items.push(
      <Pagination.Item
        onClick={() => paginationHandler(PageNumber)}
        key={PageNumber}
        active={PageNumber === activePage}
      >
        {PageNumber}
      </Pagination.Item>
    );
  }

  // uprv stanku ku prvej a poslednej

  //console.log(userData);

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
        {" "}
        {databaseData.length === 0 ? (
          <div className=" text-center mt-5">
            {" "}
            <h1> Načítavam</h1>
            <ThreeDots style={{ stroke: "black" }} />{" "}
          </div>
        ) : (
          <>
            <Stack>
              <h2 className="mx-auto mb-4">Všetky záznamy</h2>
              <ButtonGroup className="mb-4">
                <Button
                  active={activeCategory === "allCategory" ? true : false}
                  onClick={() => categoryFilter("allCategory")}
                >
                  Všetky
                </Button>
                <Button
                  active={activeCategory === "inProgress" ? true : false}
                  onClick={() => categoryFilter("inProgress")}
                >
                  Rozpracované
                </Button>
                <Button
                  active={activeCategory === "complete" ? true : false}
                  onClick={() => categoryFilter("complete")}
                >
                  Hotové
                </Button>{" "}
                {/*uprav do funkcie */}
              </ButtonGroup>
              {showData}
            </Stack>
            <Pagination className="mt-4 pagination justify-content-center">
              <Pagination.First onClick={() => paginationHandler(1)} />

              {items}

              <Pagination.Last onClick={() => paginationHandler(lastPage)} />
            </Pagination>{" "}
          </>
        )}
      </Container>
    </>
  );
}
export default AllServices;

// upraviť nazov možno aj umiestnenie css // asi ok možno vlastnu zolložku
// nazvy premennych
//co bude napisane ak su polia prazne "" napr ziadne data //ok
