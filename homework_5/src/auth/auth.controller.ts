import { Body, Controller, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dtos/register.dto';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { ICurrentUser } from '../common/types/current-user.interface';
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiOperation, ApiResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { User } from '../users/user.entity';
import { LoginDto } from './dtos/login.dto';

@UsePipes(new ValidationPipe({
    whitelist: true,
    forbidUnknownValues: true,
    transform: true
}))
@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @ApiOperation({ summary: 'Register a new user' })
    @ApiBody({ type: RegisterDto })
    @ApiCreatedResponse({
        type: User,
        description: 'The user from the request body is created'
    })
    @ApiBadRequestResponse({ description: 'The request body has wrong information, lacks some information or the user already exists' })
    @Post('/register')
    register(@Body() body: RegisterDto): Promise<any> {
        return this.authService.register(body);
    }

    // A separate LocalAuthGuard is technically not necessary, since different logic from AuthGuard would not be added; the app knows how to find the LocalStrategy with 'local' in the same way as JwtStrategy
    @UseGuards(AuthGuard('local'))
    @ApiOperation({ summary: 'Log in a user' })
    @ApiBody({ type: LoginDto })
    @ApiResponse({
        status: 200,
        description: 'The user has successfully logged in'
    })
    @ApiUnauthorizedResponse({ description: 'Invalid credentials.' })
    @Post('/login')
    login(@Body() body: LoginDto,  @CurrentUser() user: ICurrentUser) {
        return this.authService.login(user);
    }
}
