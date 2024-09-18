import { Component, inject, OnInit } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { AsyncPipe } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms'; 
import { Student } from '../../models/Student';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [
    AsyncPipe,
    MatGridListModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    FormsModule
  ]
})
export class DashboardComponent implements OnInit {
  // Lista inicial de estudiantes
  studentsArray : Student[] = [
    {
      id : 1,
      name : 'Sujey',
      asignatures : ['Ingles','POO2','Algoritmos2']
    },
    {
      id : 2,
      name : 'Melissa',
      asignatures : ['Ingles','POO2','Algoritmos2','Base de Datos']
    },
    {
      id : 3,
      name : 'Hannia',
      asignatures : ['Ingles','POO2','Algoritmos2', 'Calculo Integral', 'Calculo Vectorial']
    },
    {
      id : 4,
      name : 'Yara',
      asignatures : ['Ingles','POO2','Algoritmos2', 'Concurrente']
    }
  ];

  // Modelo del nuevo estudiante
  nuevoEstudiante: Student = {
    id: 0,
    name: '',
    asignatures: []
  };

  asignaturasString: string = '';

  ngOnInit(): void {
    console.log(this.studentsArray); // Para asegurarse de que la lista de estudiantes está cargada
  }

  deleteStudent(id: number) {
    this.studentsArray = this.studentsArray.filter(student => student.id !== id);
  }

  agregarEstudiante() {
    // Se separan las asignaturas por comas
    const asignaturas = this.asignaturasString.split(',').map(asignatura => asignatura.trim());

    // Verificación para asegurarse de que todos los campos estén llenos
    if (this.nuevoEstudiante.id && this.nuevoEstudiante.name && asignaturas.length > 0) {
      this.nuevoEstudiante.asignatures = asignaturas;
      this.studentsArray.push({ ...this.nuevoEstudiante });

      // Reseteamos el nuevo estudiante y el campo de asignaturas
      this.nuevoEstudiante = { id: 0, name: '', asignatures: [] };
      this.asignaturasString = '';
    } else {
      alert('Por favor, llene todos los campos');
    }
  }

  private breakpointObserver = inject(BreakpointObserver);
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Card 1', cols: 1, rows: 1 },
          { title: 'Card 2', cols: 1, rows: 1 },
          { title: 'Card 3', cols: 1, rows: 1 },
          { title: 'Card 4', cols: 1, rows: 1 }
        ];
      }
      return [
        { title: 'Card 1', cols: 2, rows: 1 },
        { title: 'Card 2', cols: 1, rows: 1 },
        { title: 'Card 3', cols: 1, rows: 2 },
        { title: 'Card 4', cols: 1, rows: 1 }
      ];
    })
  );
}
