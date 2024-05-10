import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './employee.entity';
import { Between, ILike, LessThan, MoreThan, Repository } from 'typeorm';
import { EmployeeCreateDto } from './dtos/employee-create.dto';
import { EmployeeUpdateDto } from './dtos/employee-update.dto';
import { EmployeeQueryDto } from './dtos/employee-query.dto';

@Injectable()
export class EmployeeService {
    constructor(@InjectRepository(Employee) private employeeRepository: Repository<Employee>) {}
    
    async getEmployees(query: EmployeeQueryDto): Promise<Employee[]> {
        let whereQuery = {}

        if(query.name) {
            whereQuery = {
                ...whereQuery,
                name: ILike(`%${query.name}%`)
            }
        }

        if (query.jobTitle && query.payType && query.isActive) {
            whereQuery = {
                ...whereQuery,
                jobTitle: ILike(`${query.jobTitle}`),
                payType: ILike(`${query.payType}`),
                isActive: ILike(`${query.isActive}`),
            }
        }
        else if (query.jobTitle && query.payType) {
            whereQuery = {
                ...whereQuery,
                jobTitle: ILike(`${query.jobTitle}`),
                payType: ILike(`${query.payType}`)
            }
        }
        else if(query.payType && query.isActive) {
            whereQuery = {
                ...whereQuery,
                payType: ILike(`${query.payType}`),
                isActive: ILike(`${query.isActive}`)
            }
        }
        else if (query.jobTitle && query.isActive) {
            whereQuery = {
                ...whereQuery,
                jobTitle: ILike(`${query.jobTitle}`),
                isActive: ILike(`${query.isActive}`)
            }
        }
        else if (query.jobTitle) {
            whereQuery = {
                ...whereQuery,
                jobTitle: ILike(`${query.jobTitle}`)
            }
        }
        else if (query.payType) {
            whereQuery = {
                ...whereQuery,
                payType: ILike(`${query.payType}`)
            }
        } 
        else if (query.isActive) {
            whereQuery = {
                ...whereQuery,
                isActive: ILike(`${query.isActive}`)
            }
        } 
        
        if(query.minPayRate && query.maxPayRate) {
            whereQuery = {
                ...whereQuery,
                payRate: Between(query.minPayRate, query.maxPayRate)
            }
        }
        else if (query.minPayRate) {
            whereQuery = {
                ...whereQuery,
                payRate: MoreThan(query.minPayRate)
            }
        }
        else if (query.maxPayRate) {
            whereQuery = {
                ...whereQuery,
                payRate: LessThan(query.maxPayRate)
            }
        }

        return this.employeeRepository.find({ where: whereQuery });
    }

    async createEmployee(body: EmployeeCreateDto): Promise<Employee> {
        const existingEmployee = await this.employeeRepository.findOne({ where: { email: body.email }})

        if(existingEmployee) throw new BadRequestException(`Employee with email: ${body.email} already exists.`);

        const newEmployee = this.employeeRepository.create(body);

        return this.employeeRepository.save(newEmployee);
    }

    async updateEmployee(id, body: EmployeeUpdateDto): Promise<Employee> {
        const existingEmployee = await this.employeeRepository.findOneByOrFail({ id });

        const existingDepartment = await this.employeeRepository.findOneOrFail({ where: { departmentId: body.departmentId } });

        const updatedEmployee = this.employeeRepository.merge(existingEmployee, body);

        return this.employeeRepository.save(updatedEmployee);
    }

    async deleteEmployee(id): Promise<void> {
        await this.employeeRepository.softDelete(id)
    }
}
