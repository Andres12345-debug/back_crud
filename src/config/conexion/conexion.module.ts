import { Global, Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { DataSource } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import { Usuario } from "src/modelos/usuario/usuario";
import { Materia } from "src/modelos/materia/materia";

@Global()
@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })], // Carga el .env
  providers: [
    {
      provide: DataSource,
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        try {
          const poolConexion = new DataSource({
            type: 'postgres',
            host: configService.get<string>('HOST'), // ✅ Corrección
            port: configService.get<number>('PUERTO'), // ✅ Corrección
            username: configService.get<string>('USER'), // ✅ Corrección
            password: configService.get<string>('CLAVE'), // ✅ Corrección
            database: configService.get<string>('BASE_DATOS'), // ✅ Corrección
            synchronize: true,
            logging: true,
            namingStrategy: new SnakeNamingStrategy(),
            entities: [Usuario, Materia],
          });

          await poolConexion.initialize();
          console.log("✅ Conexión a la base de datos exitosa: " + configService.get<string>('BASE_DATOS'));

          return poolConexion;
        } catch (miError) {
          console.error("❌ Falló la conexión a la base de datos:", miError);
          throw miError;
        }
      },
    },
  ],
  exports: [DataSource],
})
export class ConexionModule {}
