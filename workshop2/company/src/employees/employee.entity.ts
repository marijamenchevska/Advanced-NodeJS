import { PayType } from "../common/enums/pay-type.enum";
import { Department } from "../departments/department.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";

@Entity()
@Unique(['email'])
export class Employee {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @Column()
    phone: number;

    @Column({ name: 'hire_date' })
    hireDate: Date;

    @Column({ name: 'job_title' })
    jobTitle: string;

    @ManyToOne(() => Department, (department) => department.employees)
    @JoinColumn({ name: 'department_id' })
    department: Department;

    @Column({ name: 'department_id' })
    departmentId: string;

    @Column({ name: 'pay_rate' })
    payRate: number;

    @Column({ 
        name: 'pay_type',
        enum: PayType,
        enumName: 'payType'
    })
    payType: PayType;

    @Column({ name: 'is_active' })
    isActive: boolean;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @DeleteDateColumn( { name: 'deleted_at' })
    deletedAt: Date;
}