import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import Table from "react-bootstrap/Table";
function SearchResults(props) {
  const [selectedRow, setSelectedRow] = useState(null);
  const nuberOfResults = props.data.length

  const tableData = props.data.map((database) => (
    <tr
      key={database.id}
      className={selectedRow === database.id ? "bg-primary text-white" : ""}
      //setSelectedRow updates the selected row state when a row is clicked.
      onClick={() =>
        setSelectedRow((oldVal) =>
          oldVal === database.id ? null : database.id
        )
      }
    >
      <td>{database.type}</td>
      <td>{database.id}</td>
      <td>{database.name}</td>
      <td className="text-center">{database.price}</td>
      <td>{database.category}</td>
    </tr>
  ));

  const table = (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Typ</th>
          <th>kod</th>
          <th>Názov</th>
          <th>Predajná bez DPH</th>
          <th>Kategória</th>
        </tr>
      </thead>
      <tbody>{tableData}</tbody>
    </Table>
  );
  return <>{nuberOfResults !== 0 ? table : <h2 className="text-center">Nenašli sa vysledky</h2>}</>;
}
export default SearchResults;
