import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Stack from "react-bootstrap/Stack";
import ElevatorSearcher from "./ElevatorSearcher";
import SearchResults from "./SearchResults";
import database from "../../../elevatorData.json";


function SearchApp() {
  //The searchResults and search state variables are used to manage the search functionality
  const [searchResults, setSearchResults] = useState([]);
  const [search, setSearch] = useState({
    expression: "",
    category: "allCategory",
  });
  //The useEffect hook is used to update the searchResults state variable whenever the search state variable changes.
  useEffect(() => {
    //This function is used to normalize the search results based on the search expression entered by the user.
    function normlizedSearch() {
      setSearchResults((oldVal) =>
        oldVal.filter((data) => {
          const normalizedTitle = data.name
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");
          const normalizedExpression = search.expression
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");
          return normalizedTitle.includes(normalizedExpression);
        })
      );
    }
    //Checks if search.expression is empty or search.category is set to "allCategory". If either of these conditions is true, it sets searchResults to database.
    if (search.expression === "" || search.category === "allCategory") {
      setSearchResults(database.map((data) => data));
    }
    //If search.category is not "allCategory", it filters allData to only include objects where data.category matches search.category.
    if (search.category !== "allCategory") {
      setSearchResults(
        database.filter((data) => data.category === search.category)
      );
    }
    //If search.expression is not empty, normlize input
    if (search.expression !== "") {
      normlizedSearch();
    }
  }, [search]);

  return (
    <>
      <Container>
        <Stack gap={3}>
          <h2 className="mx-auto">Vyhľadávač</h2>
          <ElevatorSearcher setSearch={setSearch} />
          <SearchResults data={searchResults} />
        </Stack>
      </Container>
    </>
  );
}
export default SearchApp;
