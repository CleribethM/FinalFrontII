import { useState } from "react";
import { NombresSimpsons, INFO_SIMPSONS } from "./constants";
import { Buttons, ContainerBio, ContenedorBotonesBio, DescripcionBio, ImageBio, NombreBio } from "./styled";

const Bio = () => {
  const [bioActiva, setBioActiva] = useState(
    INFO_SIMPSONS[NombresSimpsons.BART]
  );

  const onClick: (nombre: NombresSimpsons) => void = (nombre) =>
    setBioActiva(INFO_SIMPSONS[nombre]);

  const crearBotones = () => {
    return Object.keys(INFO_SIMPSONS).map((nombre: string) => (
      <Buttons  
        key={nombre as string}
        onClick={() => onClick(nombre as NombresSimpsons)}
        primary= { bioActiva.id === nombre}>
          {nombre}
      </Buttons>            
    ));
  };

  return (
    <>
      <ContainerBio>
        <ContenedorBotonesBio>{crearBotones()}</ContenedorBotonesBio>
      </ContainerBio>
      <div>
        <ImageBio 
          src = {bioActiva.image}
          alt={bioActiva.image}          
          >
        </ImageBio>
      </div>
      <div>
        <NombreBio>{bioActiva.nombre}</NombreBio>
        <DescripcionBio>{bioActiva.descripcion}</DescripcionBio>
      </div>
      </>

  );
};

export default Bio;
