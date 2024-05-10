import { Employee } from "../employees/employee.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Department {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column({ name: 'is_active' })
    isActive: boolean;

    @OneToMany(() => Employee, (employee) => employee.departmentId)
    employees: Employee[];

    @Column({ name: 'office_location' })
    officeLocation: string;

    @Column()
    budget: number;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @DeleteDateColumn( { name: 'deleted_at' })
    deletedAt: Date;
}