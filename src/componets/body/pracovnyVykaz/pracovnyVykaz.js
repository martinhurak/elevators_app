import { useRef } from "react";

import ReactToPrint from "react-to-print";

import MyDocument from "./timeSheet";
import { Button, Container } from "react-bootstrap";
import "./timeSheet.css"

function PracovnyVykaz ({ children }) {
    const linkToPrint = () => {
        return (
            <Button>tlač</Button>
        )
    }
    const componentRef = useRef();
    return (
        <>
           <Container>
           <h2 className="text-center mb-4">Pracovný výkaz</h2>
            <div ref={componentRef}>
                <MyDocument/>
                {children}
            </div>
             <ReactToPrint trigger={linkToPrint} content={() => componentRef.current} />
             </Container>
        </>
    );
    
} 
export default PracovnyVykaz