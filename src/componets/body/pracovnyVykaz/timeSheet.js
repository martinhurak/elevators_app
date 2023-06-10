function TimeSheet() {
  return (
    <div className="time-sheet">
      <div className="general-info">
        <div className="genaral-info-required">
          <div>
            <span contentEditable="true">Žiadateľ:</span>
            <span contentEditable={true}>skusobny 1</span>
          </div>
          <div>
            <span>Adresa:</span>
            <span contentEditable={true}>skusobna 1</span>
          </div>
          <div>
            <span>Dátum nahlásenia opravy:</span>
            <span contentEditable={true}>6.5.2023</span>
          </div>
        </div>
        <div className="genaral-info-additional">
          <div>
            <span>Tel:</span>
            <span contentEditable={true}>+421 917 886 127</span>
          </div>{" "}
          <span>Podpis žiadatela:</span>
        </div>
      </div>
      <div className="work-description">
        <span>Popis požadovanej práce: </span>
      </div>
      <div className="additional-info">
        <b className="additional-info-title">PRACOVNÝ VÝKAZ</b>
        <div  style={{ outline: "1px solid black" }}>
          <p className="additional-info-text"> 
           <span>ELBE Výťahy, s.r.o.</span>   <span>Kozmonautov 4862/35, 03601 Martin </span> 
            Reklamaciu vykonaných prác je potrebné uplatniť bezodkladne, najneskôr v záručnej dobe pisomne. Záruka sa nevzťahuje,ak sa pri opakovanej oprave zistí neodborné zaobchadzanie alebo mechanické poškodenie opravovaného resp. vymieňaného konštrukčného prvku.
          </p>
        </div>
      </div>
      <div className="work-list"></div>
      <div className="material-list"></div>
      <div className="employees-name"></div>
      <div className="transport"></div>
    </div>
  );
}
export default TimeSheet;
