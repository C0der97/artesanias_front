import type { Artesano, Producto } from './types';

export const artesanos: Artesano[] = [
    {
        id: '1',
        nombre: 'María Rodríguez',
        region: 'Boyacá',
        especialidad: 'Tejidos en lana',
        historia: 'Con 30 años de experiencia en tejidos tradicionales...',
        contacto: 'maria.rodriguez@email.com'
    },
    {
        id: '2',
        nombre: 'José Pérez',
        region: 'Cundinamarca',
        especialidad: 'Cerámica tradicional',
        historia: 'Heredó el oficio de su padre hace 20 años...',
        contacto: 'jose.perez@email.com'
    }
];

export const productos: Producto[] = [
    {
        id: '1',
        nombre: 'Ruana tradicional',
        descripcion: 'Ruana tejida a mano en lana virgen',
        precio: 150000,
        artesanoId: '1',
        categoria: 'Tejidos',
        materiales: ['Lana virgen', 'Tintes naturales'],
        imagenUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRudRmqD0szUdNW5tJFEupjhtG7Q19KQpO1sg&s',
        region: 'Boyacá'
    },
    {
        id: '2',
        nombre: 'Vasija decorativa',
        descripcion: 'Vasija en cerámica con motivos muiscas',
        precio: 85000,
        artesanoId: '2',
        categoria: 'Cerámica',
        materiales: ['Arcilla', 'Pigmentos naturales'],
        imagenUrl: 'https://i.pinimg.com/236x/35/06/fc/3506fcdaa77b3a8d1e175b409332f747.jpg',
        region: 'Cundinamarca'
    }
];