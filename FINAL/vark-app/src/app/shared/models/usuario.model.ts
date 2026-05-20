export class UsuarioModel {
    usuario_id: number = 0;
    nombre: string = '';
    email: string = '';
    contrasena: string = '';
    grupo: 'PRIMARIA' | 'SECUNDARIA' | 'PREPA'| 'LICENCIATURA' | 'MAESTRIA' | 'DOCTORADO'  |null = null;;
    rol: 'ADMIN' | 'USUARIO' = 'USUARIO';
}
