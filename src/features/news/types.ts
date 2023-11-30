export interface INoticiasStandarizada {
    id: number;
    titulo: string;
    descripcion: string;
    fecha: number | string;
    esPremium: boolean;
    imagen: string;
    descripcionCorta?: string;
  }


  export interface IModal {
    noticia: INoticiasStandarizada | null;
    visible: boolean;
  }