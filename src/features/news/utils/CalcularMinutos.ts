import { INoticias } from "../fakeRest";

const CalcularMinutos = (info:INoticias) => { 
        const ahora = new Date();

        const minutosTranscurridos = Math.floor(
          (ahora.getTime() - info.fecha.getTime()) / 60000
        );
        return minutosTranscurridos;

}

export default CalcularMinutos