import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { Department } from './department.entity';
import { DepartmentCreateDto } from './dtos/department-create.dto';
import { DepartmentUpdateDto } from './dtos/department-update.dto';
import { DepartmentQueryDto } from './dtos/department-query.dto';

@UsePipes(new ValidationPipe({
    whitelist: true,
    forbidUnknownValues: true,
    transform: true
}))
@Controller('departments')
export class DepartmentController {
    constructor(private readonly departmentService: DepartmentService) {}

    @Get('/')
    getDepartments(@Query() query: DepartmentQueryDto): Promise<Department[]> {
        return this.departmentService.getDepartments(query);
    }

    @Post('/')
    createDepartment(@Body() body: DepartmentCreateDto): Promise<Department> {
        return this.departmentService.createDepartment(body);
    }

    @Put('/:id')
    updateDepartment(@Param('id', ParseUUIDPipe) id: string, @Body() body: DepartmentUpdateDto): Promise<Department> {
        return this.departmentService.updateDepartment(id, body);
    }

    @Delete('/:id')
    deleteDepartment(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
        return this.departmentService.deleteDepartment(id);
    }

}
