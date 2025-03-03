import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { Usuario } from 'src/modelos/usuario/usuario';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}
  @Get('/todos')
  public obtenerTodosLosUsuarios(): any {
    return this.usuariosService.consultar();
  }
  @Post('/agregar')
  public registrarUsuario(@Body() objUsu: Usuario): any {
    return this.usuariosService.registrar(objUsu);
  }
  @Get('/one/:cod_usuario')
  public consultarUnUsuario(@Param() parametro: any) {
    const codigoUsuario: number = Number(parametro.cod_usuario);
    if (!isNaN(codigoUsuario)) {
      return this.usuariosService.consultarUno(codigoUsuario);
    } else {
      return new HttpException(
        'El código de usuario no es válido',
        HttpStatus.NOT_ACCEPTABLE,
      );
    }
  }
  @Put('/update/:cod_usuario')
  public actualizarUsuario(
    @Body() objetoActualizar: Usuario,
    @Param() parametro: any,
  ) {
    const codigoUsuario: number = Number(parametro.cod_usuario);
    if (!isNaN(codigoUsuario)) {
      return this.usuariosService.actualizar(objetoActualizar, codigoUsuario);
    } else {
      return new HttpException(
        'El código de usuario no es válido',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  @Delete('/delete/:cod_usuario')
  public eliminarUsuario(
    @Body() objetoEliminar: Usuario,
    @Param() parametro: any,
  ) {
    const codigoUsuario: number = Number(parametro.cod_usuario);
    if (!isNaN(codigoUsuario)) {
      return this.usuariosService.eliminar(objetoEliminar, codigoUsuario);
    } else {
      return new HttpException(
        'El código de usuario no es válido',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
