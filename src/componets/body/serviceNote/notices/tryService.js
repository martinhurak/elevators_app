import { onValue, ref } from "firebase/database";
import { useEffect, useRef, useState } from "react";
import {
  Accordion,
  Button,
  ButtonGroup,
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

  // hladanie podla kategorie 
 // const activeCategory = useRef("allCategory")
  const [activeCategory,setActiveCategory]= useState("allCategory")
  const [categoryData,setcategoryData] = useState([])
  const categoryFilter = (selectedCategory) => {

   // setDatabaseData(databaseData.filter((a)=>a.isCompleted === true))
    if (selectedCategory === "complete")
   { setUserData(databaseData.filter((a)=>a.isCompleted === true)) 
    setActiveCategory("complete")
  }
   else if(selectedCategory === "inProgress")
   {setUserData(databaseData.filter((a)=>a.isCompleted === false))
  setActiveCategory("inProgress") 
  paginationHandler(1)}
   else   {
    setUserData(databaseData)
    setActiveCategory ("allCategory")
    paginationHandler(1)
   }
    
  }
  console.log(activeCategory)
  //pagination

  let [activePage, setActivePage] = useState(1);
  let items = [];
  const numResults = 10;

  const paginationHandler = (PageNumber) => {
    setActivePage(PageNumber);
    const startIndex = (PageNumber - 1) * numResults;
    const endIndex = PageNumber * numResults;
    //console.log(startIndex, endIndex);
    setUserData(databaseData.slice(startIndex, endIndex));
  };

  const totalPages = Math.ceil(databaseData.length / numResults);
  const lastPage = totalPages;
 // console.log(lastPage)

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
          <ButtonGroup className="mb-4">
            <Button active={activeCategory === "allCategory" ? true : false} onClick={()=>categoryFilter("allCategory")}>Všetky</Button>
            <Button active={activeCategory === "inProgress" ? true : false} onClick={()=>categoryFilter("inProgress")}>Rozpracované</Button>
            <Button active={activeCategory === "complete" ? true : false} onClick={()=>categoryFilter("complete")}>Hotové</Button> {/*uprav do funkcie */}
          </ButtonGroup>
          {showData}
        </Stack>
     {  /* <Pagination className="mt-4 pagination justify-content-center">
          <Pagination.First onClick={() => paginationHandler(1)} />

          {items}

          <Pagination.Last onClick={() => paginationHandler(lastPage)} />
</Pagination>*/}
      </Container>
    </>
  );
}
export default AllServices;

// upraviť nazov možno aj umiestnenie css // asi ok možno vlastnu zolložku
// nazvy premennych
//co bude napisane ak su polia prazne "" napr ziadne data //ok
