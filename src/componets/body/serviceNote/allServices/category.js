import { Button, ButtonGroup } from "react-bootstrap";

function Category (props){
    const categoryFilter = (selectedCategory) => {
        switch (selectedCategory) {
          case "complete":
           props.setcategoryData(props.databaseData.filter((task) => task.isCompleted));
           props.setActiveCategory("complete");
            break;
          case "inProgress":
            props.setcategoryData(props.databaseData.filter((task) => !task.isCompleted));
            props.setActiveCategory("inProgress");
            break;
          case "allCategory":
            props.setcategoryData(props.databaseData);
            props.setActiveCategory("allCategory");
            break;
          default:
            props.setcategoryData(props.databaseData);
            props.setActiveCategory("allCategory");
            break;
        }
        props.setActivePage(1);
      };
return (
      <ButtonGroup className="mb-4">
      <Button
        active={props.activeCategory === "allCategory" ? true : false}
        onClick={() => categoryFilter("allCategory")}
      >
        Všetky
      </Button>
      <Button
        active={props.activeCategory === "inProgress" ? true : false}
        onClick={() => categoryFilter("inProgress")}
      >
        Rozpracované
      </Button>
      <Button
        active={props.activeCategory === "complete" ? true : false}
        onClick={() => categoryFilter("complete")}
      >
        Hotové
      </Button>
    </ButtonGroup>)
}
export default Category