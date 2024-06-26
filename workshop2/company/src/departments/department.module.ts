import { DepartmentController } from './department.controller';
import { DepartmentService } from './department.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Department } from './department.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Department])],
    controllers: [DepartmentController],
    providers: [DepartmentService]
})
export class DepartmentModule {}
