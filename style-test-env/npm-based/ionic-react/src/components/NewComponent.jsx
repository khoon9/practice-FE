import React from "react";
import styled from "styled-components";
import { IonButton } from "@ionic/react";

const NewComponent = () => {
  return (
    <div>
      {" "}
      <IonButton style={{ width: "200px" }} className="only-test-for-btn">
        Hello, Ionic
      </IonButton>
      <IonButton fill={`outline || outline`} color="primary">
        Outline Button
      </IonButton>
      <NewIonBtna>new</NewIonBtna>
    </div>
  );
};

const NewIonBtna = styled(IonButton)`
  width: 50px;
`;

export default NewComponent;
