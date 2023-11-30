import Noticia from "./Noticia";
import { ListaNoticias } from "./styled";
import { INoticiasStandarizada } from "./types";

interface ListaNoticiasProps {
    noticias: INoticiasStandarizada[];
    setModal: (noticia: INoticiasStandarizada| null) => void;
  }  

const ListaDeNoticias: React.FC<ListaNoticiasProps> = ({ noticias, setModal }) => {
    return (
      <ListaNoticias>
        {noticias.map((noticia) => (
          <Noticia key={noticia.id} noticia={noticia} setModal={setModal} />
        ))}
      </ListaNoticias>
    );
  };

  export default ListaDeNoticias;