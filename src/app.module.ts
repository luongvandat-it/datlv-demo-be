import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as path from 'path';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OwnerModule } from './owner/owner.module';
import { PetsModule } from './pets/pets.module';

@Module({
  imports: [GraphQLModule.forRoot<ApolloDriverConfig>({
    driver: ApolloDriver,
    autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    csrfPrevention: false,
    playground: true,
  }), TypeOrmModule.forRoot({
    ...require(path.resolve('ormconfig.json')),
  }), PetsModule, OwnerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }