import { INoticias } from '../fakeRest'

const PasarAMayusculas = (info:INoticias) => { 
   return (
    info.titulo
   .split(" ")
   .map((str) => {
     return str.charAt(0).toUpperCase() + str.slice(1);
   })
   .join(" ")
   )
}

export default PasarAMayusculas