import { onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { Container, Stack } from "react-bootstrap";

import { db } from "../../../firebase";
import "./allServices.css";

import ThreeDots from "react-loading-icons/dist/esm/components/three-dots";
import UserView from "./allServices/userView";
import PaginationHandler from "./allServices/paginationHandler";
import Category from "./allServices/category";

function AllServices() {
  const [databaseData, setDatabaseData] = useState([]); 
  //get data from firebase 
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

  // category state

  const [activeCategory, setActiveCategory] = useState("allCategory");
  const [categoryData, setcategoryData] = useState(databaseData);
  // pagination state
  const [activePage, setActivePage] = useState(1);
  const numResults = 10;

  useEffect(() => {// toto skus dat kde zobrazuješ page 
    const startIndex = (activePage - 1) * numResults;
    const endIndex = activePage * numResults;
    setUserData(categoryData.slice(startIndex, endIndex));
  }, [activePage, categoryData]);

  return (
    <>
      {/* <Accordion>
        
        <AccordionItem>
          <AccordionHeader>Rozsirene možnosti domysli to</AccordionHeader>
          <AccordionBody>ss</AccordionBody>
        </AccordionItem>
  </Accordion> */}
      <Container>
        {databaseData.length === 0 ? (
          <div className=" text-center mt-5">
            <h1> Načítavam</h1>
            <ThreeDots style={{ stroke: "black" }} />
          </div>
        ) : (
          <>
            <Stack>
              <h2 className="mx-auto mb-4">Všetky záznamy</h2>

              <Category
                databaseData={databaseData}
                activeCategory={activeCategory}
                setcategoryData={setcategoryData}
                setActiveCategory={setActiveCategory}
                setActivePage={setActivePage}
              />
              <UserView userData={userData} />
            </Stack>
            <PaginationHandler
              categoryData={categoryData}
              activePage={activePage}
              setActivePage={setActivePage}
            />
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
