import { Toast,  ToastContainer } from "react-bootstrap";
import Alert from "react-bootstrap/Alert";
import { Link } from "react-router-dom";

function SendDataNotification(props) {
  return (
    <ToastContainer  className="p-3 " position="top-center">
      <Toast
        show={props.show}
        onClose={() => props.onHide()}
        delay={props.isSuccess? 2000:5000} 
       // autohide
      >
        <Alert style={{opacity:0.7 }} className="m-0 text-center " variant={props.isSuccess?"success":"danger"}>
          <Alert.Heading>{props.isSuccess ? "hotovo":"problém"}</Alert.Heading>
          <h3>{props.isSuccess ? "Úloha bola odoslaná":"Úloha nebola odoslaná"}</h3>
          {props.isSuccess ? " ":<p>Pre dodatočne informacie otvorte dev tools</p>}
          <div > <Link to="../elevator_App/allServices">do vykonu</Link>  </div> {/*uprav link */}
        </Alert>
      </Toast>
    </ToastContainer>
  );
}

export default SendDataNotification;


