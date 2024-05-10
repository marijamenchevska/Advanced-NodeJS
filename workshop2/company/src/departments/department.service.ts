import { BadRequestException, Injectable } from '@nestjs/common';
import { Department } from './department.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, MoreThan, Repository } from 'typeorm';
import { DepartmentCreateDto } from './dtos/department-create.dto';
import { DepartmentUpdateDto } from './dtos/department-update.dto';
import { DepartmentQueryDto } from './dtos/department-query.dto';

@Injectable()
export class DepartmentService {
    constructor(@InjectRepository(Department) private departmentRepository: Repository<Department>) {} 

    async getDepartments(query: DepartmentQueryDto): Promise<Department[]> {
        let whereQuery = {}

        if(query.name && query.officeLocation) {
            whereQuery = {
                ...whereQuery,
                name: ILike(`%${query.name}%`),
                officeLocation: ILike(`%${query.officeLocation}%`)
            }
        }
        else if (query.name) {
            whereQuery = {
                ...whereQuery,
                name: ILike(`%${query.name}%`),
            }
        }
        else if (query.officeLocation) {
            whereQuery = {
                ...whereQuery,
                officeLocation: ILike(`%${query.officeLocation}%`)
            }
        }

        if(query.isActive && query.budget) {
            whereQuery = {
                ...whereQuery,
                isActive: ILike(`${query.isActive}`),
                budget: MoreThan(query.budget)
            }
        }
        else if (query.isActive) {
            whereQuery = { 
                ...whereQuery,
                isActive: ILike(`${query.isActive}`) 
            }
        }
        else if (query.budget) {
            whereQuery = { 
                ...whereQuery,
                budget: MoreThan(query.budget) 
            }
        }

        return this.departmentRepository.find({ where: whereQuery });
    }

    async createDepartment(body: DepartmentCreateDto): Promise<Department> {
        const existingDepartment = await this.departmentRepository.findOne({ where: { name: body.name } });

        if(existingDepartment) throw new BadRequestException(`${body.name} department already exists.`);

        const newDepartment = this.departmentRepository.create(body);

        return this.departmentRepository.save(newDepartment);
    }

    async updateDepartment(id, body: DepartmentUpdateDto): Promise<Department> {
        const existingDepartment = await this.departmentRepository.findOneByOrFail({ id });

        const updatedDepartment = this.departmentRepository.merge(existingDepartment, body);

        return this.departmentRepository.save(updatedDepartment);
    }

    async deleteDepartment(id): Promise<void> {
        await this.departmentRepository.softDelete(id)
    }
}
