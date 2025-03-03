import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Materia } from 'src/modelos/materia/materia';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class MateriasService {
  private materiaRepository: Repository<Materia>;
  constructor(private poolConxion: DataSource) {
    this.materiaRepository = poolConxion.getRepository(Materia);
  }
  public async consultar(): Promise<any> {
    try {
      return this.materiaRepository.find();
    } catch (error) {
      return new HttpException(
        'Error al consultar las materias',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  public async verificar(nombre: string): Promise<boolean> {
    const existe = await this.materiaRepository.findBy({
      nombreMateria: nombre,
    });
    return existe.length > 0;
  }
  public async registrar(objMate: Materia): Promise<any> {
    try {
      // Verificar si el usuario ya existe
      if (await this.verificarMateria(objMate.nombreMateria)) {
        throw new HttpException('El usuario ya existe', HttpStatus.CONFLICT);
      }
      // Registrar el usuario
      const materiaGuardado = await this.materiaRepository.save(objMate);
      return {
        succes: true,
        message: 'Materia registrada correctamente',
        data: materiaGuardado,
      };
    } catch (error) {
      //mensaje error
      return new HttpException(
        {
          succes: false,
          message: error.message || 'Error al registrar la materia',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  public async consultarUno(codigo: number): Promise<any> {
    try {
      return this.materiaRepository.findBy({ codMateria: codigo });
    } catch (error) {
      return new HttpException(
        'Error al consultar la materia',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  public async verificarMateria(nombre: string): Promise<boolean> {
    try {
      const existe = await this.materiaRepository.findBy({
        nombreMateria: nombre,
      });
      return existe.length > 0;
    } catch (miError) {
      throw new HttpException(
        'Error al verificar si la materia existe',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async actualizar(objMateria: Materia, codigo: number): Promise<any> {
    try {
      // Obtener el rol existente
      const UsuExistente = await this.materiaRepository.findOneBy({
        codMateria: codigo,
      });

      if (!UsuExistente) {
        throw new HttpException('La materia no existe', HttpStatus.NOT_FOUND);
      }

      // Verificar si el nombre de rol ha cambiado y si ya existe otro con ese nombre
      if (
        objMateria.nombreMateria &&
        objMateria.nombreMateria !== UsuExistente.nombreMateria &&
        (await this.verificarMateria(objMateria.nombreMateria))
      ) {
        throw new HttpException(
          'El nombre de la materia ya existe',
          HttpStatus.BAD_REQUEST,
        );
      }

      // Actualizar el rol
      const resultado = await this.materiaRepository.update(
        { codMateria: codigo },
        objMateria,
      );

      // Verificar si la actualización fue exitosa
      if (resultado.affected && resultado.affected > 0) {
        // Retornar éxito con el objeto actualizado
        const rolActualizado = await this.materiaRepository.findOneBy({
          codMateria: codigo,
        });
        return { mensaje: 'Materia actualizada', objeto: rolActualizado };
      } else {
        // Si no se afectó ningún registro
        throw new HttpException(
          'No se pudo actualizar la materia',
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (miError) {
      throw new HttpException(
        miError.message || 'Fallo al actualizar la materia',
        miError.status || HttpStatus.BAD_REQUEST,
      );
    }
  }
  public async eliminar(objMate: Materia, codigo: number): Promise<any> {
    try {
      return this.materiaRepository.delete({ codMateria: codigo });
    } catch (error) {
      throw new HttpException(
        'fallo al eliminar el usuario',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
