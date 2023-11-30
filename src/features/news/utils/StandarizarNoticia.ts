import { INoticias } from "../fakeRest";
import CalcularMinutos from "./CalcularMinutos";
import PasarAMayusculas from "./PasarAMayusculas";

const StandarizarNoticia = (noticia:INoticias) => {
    const titulo = PasarAMayusculas(noticia);
    const minutosTranscurridos = CalcularMinutos(noticia);    
    return {
      id: noticia.id,
      titulo,
      descripcion: noticia.descripcion,
      fecha: `Hace ${minutosTranscurridos} minutos`,
      esPremium: noticia.esPremium,
      imagen: noticia.imagen,
      descripcionCorta: noticia.descripcion.slice(0, 100),
    };
  };

  export default StandarizarNoticia;