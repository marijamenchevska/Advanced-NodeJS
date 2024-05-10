import { EmployeeModule } from './employees/employee.module';
import { DepartmentModule } from './departments/department.module';
import { DatabaseModule } from './database/database.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), EmployeeModule, DepartmentModule, DatabaseModule],
  controllers: [],
  providers: []
})
export class AppModule {}
