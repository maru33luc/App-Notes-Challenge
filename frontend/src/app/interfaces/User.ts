export interface User {
    id?: number;
    nombre: string;
    correo: string;
    contraseñaHash: string;
    createdAt?: Date;
    updatedAt?: Date;
    }