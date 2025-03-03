import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { MateriasService } from './materias.service';
import { Materia } from 'src/modelos/materia/materia';

@Controller('materias')
export class MateriasController {
      constructor(private readonly materiaService: MateriasService) {}
      @Get('/todos')
      public obtenerTodosLosUsuarios(): any {
        return this.materiaService.consultar();
      }
      @Post('/agregar')
      public registrarUsuario(@Body() objMate: Materia): any {
        return this.materiaService.registrar(objMate);
      }
      @Get('/one/:cod_materia')
      public consultarUnUsuario(@Param() parametro: any) {
        const codigoMateria: number = Number(parametro.cod_materia);
        if (!isNaN(codigoMateria)) {
          return this.materiaService.consultarUno(codigoMateria);
        } else {
          return new HttpException(
            'El código de la materia no es válido',
            HttpStatus.NOT_ACCEPTABLE,
          );
        }
      }
      @Put('/update/:cod_materia')
      public actualizarUsuario(
        @Body() objetoActualizar: Materia,
        @Param() parametro: any,
      ) {
        const codigoMateria: number = Number(parametro.cod_materia);
        if (!isNaN(codigoMateria)) {
          return this.materiaService.actualizar(objetoActualizar, codigoMateria);
        } else {
          return new HttpException(
            'El código de la materia no es válido',
            HttpStatus.BAD_REQUEST,
          );
        }
      }
      @Delete('/delete/:cod_materia')
      public eliminarUsuario(
        @Body() objetoEliminar: Materia,
        @Param() parametro: any,
      ) {
        const codigoMateria: number = Number(parametro.cod_materia);
        if (!isNaN(codigoMateria)) {
          return this.materiaService.eliminar(objetoEliminar, codigoMateria);
        } else {
          return new HttpException(
            'El código de la materia no es válido',
            HttpStatus.BAD_REQUEST,
          );
        }
      }
}
