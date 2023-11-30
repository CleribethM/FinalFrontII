import { SuscribeImage, CloseButton as Close } from "../../assets";
import {
    CloseButton,
    TarjetaModal,
    ContenedorModal,
    DescripcionModal,
    ImagenModal,
    TituloModal,    
    BotonSuscribir,
    CotenedorTexto,
  } from "./styled";
import { INoticiasStandarizada } from "./types";

  interface ModalPremiumProps {
    setModal: (noticia: INoticiasStandarizada | null) => void;
  }

const ModalPremium: React.FC<ModalPremiumProps>  = ({ setModal }) => {
    const suscribirse = () => {
      setTimeout(() => {
        alert("Suscripto!");
        setModal(null);
      }, 1000);
    };
  
    return (
      <ContenedorModal>
        <TarjetaModal>
          <CloseButton onClick={() => setModal(null)}>
            <img src={Close} alt="close-button" />
          </CloseButton>
          <ImagenModal src={SuscribeImage} alt="mr-burns-excelent" />
          <CotenedorTexto>
            <TituloModal>Suscríbete a nuestro Newsletter</TituloModal>
            <DescripcionModal>
              Suscríbete a nuestro newsletter y recibe noticias de nuestros personajes favoritos.
            </DescripcionModal>
            <BotonSuscribir onClick={suscribirse}>Suscríbete</BotonSuscribir>
          </CotenedorTexto>
        </TarjetaModal>
      </ContenedorModal>
    );
  };

  export default ModalPremium;