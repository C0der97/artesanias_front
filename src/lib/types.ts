export interface Artesano {
    id: string;
    nombre: string;
    region: 'Boyacá' | 'Cundinamarca';
    especialidad: string;
    historia: string;
    contacto: string;
}

export interface Producto {
    id: string;
    nombre: string;
    descripcion: string;
    precio: number;
    artesanoId: string;
    categoria: string;
    materiales: string[];
    imagenUrl: string;
    region: 'Boyacá' | 'Cundinamarca';
}