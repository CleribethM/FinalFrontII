
import {   
    TarjetaNoticia,
    FechaTarjetaNoticia,
    DescripcionTarjetaNoticia,
    ImagenTarjetaNoticia,
    TituloTarjetaNoticia, 
    BotonLectura,   
  } from "./styled";
import { INoticiasStandarizada } from "./types";

  
interface NoticiaProps {
    noticia: INoticiasStandarizada;
    setModal: (noticia: INoticiasStandarizada | null) => void;
  }

const Noticia : React.FC<NoticiaProps>= ({ noticia, setModal }) => {
    return (
      <TarjetaNoticia>
        <ImagenTarjetaNoticia src={noticia.imagen} />
        <TituloTarjetaNoticia>{noticia.titulo}</TituloTarjetaNoticia>
        <FechaTarjetaNoticia>{noticia.fecha}</FechaTarjetaNoticia>
        <DescripcionTarjetaNoticia>{noticia.descripcionCorta}</DescripcionTarjetaNoticia>
        <BotonLectura onClick={() => setModal(noticia)}>Ver más</BotonLectura>
      </TarjetaNoticia>
    );
  };

  export default Noticia;

