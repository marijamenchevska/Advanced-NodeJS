import { EmployeeCreateDto } from './dtos/employee-create.dto';
import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { Employee } from './employee.entity';
import { EmployeeService } from './employee.service';
import { EmployeeUpdateDto } from './dtos/employee-update.dto';
import { EmployeeQueryDto } from './dtos/employee-query.dto';

@UsePipes(new ValidationPipe({
    whitelist: true,
    forbidUnknownValues: true,
    transform: true
}))
@Controller('employees')
export class EmployeeController {
    constructor(private readonly employeeService: EmployeeService) {}
    
    @Get('/')
    getEmployees(@Query() query: EmployeeQueryDto): Promise<Employee[]> {
        return this.employeeService.getEmployees(query);
    }

    @Post('/')
    createEmployee(@Body() body: EmployeeCreateDto): Promise<Employee> {
        return this.employeeService.createEmployee(body);
    }

    @Put('/:id')
    updateEmployee(@Param('id', ParseUUIDPipe) id: string, @Body() body: EmployeeUpdateDto): Promise<Employee> {
        return this.employeeService.updateEmployee(id, body);
    }

    @Delete('/:id')
    deleteEmployee(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
        return this.employeeService.deleteEmployee(id);
    }
}
