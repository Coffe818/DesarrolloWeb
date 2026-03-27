export class Tiket {
  is_new: boolean = true;
  ticket_id?: number = 0;
  nombre_realiza: string = '';
  curp: string = '';
  nombre: string = '';
  apellido_paterno: string = '';
  apellido_materno: string = '';
  telefono: string = '';
  celular: number = 0;
  correo: string = '';
  nivel_estudios: string = '';
  municipio: string = '';
  municipio_nombre: string = '';
  asunto: string = '';
  estatus_ticket: string = 'PENDIENTE';
  turno?: number = 0;
}
