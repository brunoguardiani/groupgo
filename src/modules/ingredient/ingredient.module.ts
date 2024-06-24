/* eslint-disable prettier/prettier */

import { Module } from '@nestjs/common';
import { IngredientController } from './ingredient.controller';
import { IngredientService } from './ingredient.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ingredient } from './entities/ingredient.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Ingredient])
  ],
  controllers: [IngredientController],
  providers: [IngredientService]
})
export class IngredientModule {}
