import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../shared/services/user.service';
import { AlertService } from '../../shared/services/alert.service';

interface Usuario {
  usuario_id: number;
  nombre: string;
  email: string;
  grupo: string;
  rol: string;
}

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css',
  imports: [FormsModule],
})
export class UsuariosComponent implements OnInit {
  listaUsuarios = signal<Usuario[]>([]);
  usuarioService = inject(UserService);
  private alertService = inject(AlertService);

  mostrarFormulario = signal(false);
  usuarioEditando: Usuario | null = null;

  ngOnInit(): void {
    this.obtenerUsuarios();
  }

  obtenerUsuarios() {
    this.usuarioService.obtenerListaUsuarios().subscribe({
      next: (resp: any) => {
        this.listaUsuarios.set(resp);
      },
      error: (err) => {
        this.alertService.error('No se pudieron cargar los usuarios');
      },
    });
  }

  abrirFormularioEditar(usuario: Usuario) {
    this.usuarioEditando = { ...usuario };
    this.mostrarFormulario.set(true);
  }

  cancelarEdicion() {
    this.mostrarFormulario.set(false);
    this.usuarioEditando = null;
  }

  guardarCambios() {
    if (!this.usuarioEditando) return;
    this.usuarioService.updateUsuario(this.usuarioEditando.usuario_id, this.usuarioEditando).subscribe({
      next: () => {
        this.alertService.success('Usuario actualizado correctamente');
        this.cancelarEdicion();
        this.obtenerUsuarios();
      },
      error: (err) => {
        this.alertService.error('No se pudo actualizar el usuario');
      },
    });
  }

  borrarUsuario(usuarioId: number, nombreUsuario: string) {
    this.alertService.confirm('¿Estás seguro?', `¿Deseas eliminar a ${nombreUsuario}?`).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.borrarUsuario(usuarioId).subscribe({
          next: () => {
            this.alertService.success('Usuario eliminado correctamente');
            this.obtenerUsuarios();
          },
          error: (err) => {
            console.error('Error al eliminar usuario', err);
            this.alertService.error('No se pudo eliminar el usuario');
          },
        });
      }
    });
  }
}
