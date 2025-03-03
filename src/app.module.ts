import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrivadoModule } from './modulos/privado/privado.module';
import { ConfigModule } from '@nestjs/config';
import { ConexionModule } from './config/conexion/conexion.module';

@Module({
  imports: [ConfigModule.forRoot({isGlobal: true,envFilePath:".env"}), ConexionModule,  PrivadoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
