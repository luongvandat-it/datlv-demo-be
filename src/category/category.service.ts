import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  create(createCategoryInput: CreateCategoryInput) {
    const newCategory = this.categoryRepository.create(createCategoryInput);
    return this.categoryRepository.save(newCategory);
  }

  findAll() {
    return this.categoryRepository.find();
  }

  findOne(id: number) {
    return this.categoryRepository.findOneOrFail({
      where: {
        id: id,
      },
    });
  }

  update(id: number, updateCategoryInput: UpdateCategoryInput) {
    const updatedCategory = this.categoryRepository.create(updateCategoryInput);
    return this.categoryRepository.save(updatedCategory);
  }

  remove(id: number) {
    return this.categoryRepository.delete(id);
  }
}
