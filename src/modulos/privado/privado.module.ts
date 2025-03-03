import { Module } from '@nestjs/common';
import { UsuariosModule } from './usuarios/usuarios.module';
import { MateriasModule } from './materias/materias.module';
import { RouterModule, Routes } from '@nestjs/core';

const routes: Routes = [
  {
    path: 'privado',
    children: [UsuariosModule, MateriasModule]
  }
];

@Module({
  imports: [
    UsuariosModule, 
    MateriasModule,
    RouterModule.register(routes),

  ],
  exports: [RouterModule],
})
export class PrivadoModule {}