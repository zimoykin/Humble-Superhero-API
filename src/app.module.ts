import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { serviceSchema } from './service-config';
import { SuperheroesModule } from './superheroes/superheroes.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: serviceSchema,
    }),
    SuperheroesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
