TypeScript
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-registrar-asistencia',
  template: `
    <div style="padding: 20px;">
      <h2>Registrar Asistencia Diaria</h2>
      <div *ngFor="let est of estudiantes" style="margin-bottom: 10px;">
        <span>{{ est.nombres }}</span>
        <select [(ngModel)]="est.estado_asistencia" style="margin-left: 10px;">
          <option value="Presente">Presente</option>
          <option value="Falta">Falta</option>
          <option value="Licencia">Licencia</option>
          <option value="Atraso">Atraso</option>
        </select>
      </div>
      <button (click)="guardarAsistencia()" style="margin-top: 20px; padding: 10px;">Guardar en Base de Datos</button>
    </div>
  `
})
export class RegistrarAsistenciaComponent implements OnInit {
  idAsignacionDocente = '1'; 
  estudiantes = [
    { id_inscripcion: '101', nombres: 'Juan Perez', estado_asistencia: 'Presente' },
    { id_inscripcion: '102', nombres: 'Maria Lopez', estado_asistencia: 'Presente' },
    { id_inscripcion: '103', nombres: 'Carlos Mendoza', estado_asistencia: 'Presente' }
  ];

  constructor(private http: HttpClient) { }
  ngOnInit(): void {}

  guardarAsistencia() {
    const payload = {
      id_asignacion_docente: this.idAsignacionDocente,
      fecha: new Date().toISOString().split('T')[0],
      estado: 'ACTIVO',
      registrado_por: 'Docente_User',
      estudiantes: this.estudiantes
    };

    this.http.post('http://localhost:3000/api/asistencia/registrar', payload).subscribe({
      next: (res) => alert('¡Asistencia guardada con éxito!'),
      error: (err) => alert('Error al conectar con la Base de Datos')
    });
  }
}
