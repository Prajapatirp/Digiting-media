import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  Req,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { ServiceService } from './service.service';
import { Roles } from 'src/libs/services/auth/decorators/roles.decorator';
import { ModuleName, Role } from 'src/libs/utils/enums';
import { JwtGuard } from 'src/libs/services/auth/guard/jwt.guard';
import { RolesGuard } from 'src/libs/services/auth/guard/roles.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { StatusRO } from 'src/libs/utils/interface';
import { UpdateServiceDto } from './dto/updateService.dto';
import { AddServiceDto } from './dto/addService.dto';
import { ListOfDataDto } from 'src/auth-user/dto/listOfData.dto';

@Controller('service')
@ApiTags(ModuleName.package)
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Roles(Role.Admin)
  @UseGuards(JwtGuard, RolesGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'This api is for add different service' })
  @Post('')
  addService(@Body() dto: AddServiceDto, @Req() req: any): Promise<StatusRO> {
    return this.serviceService.addService(dto);
  }

  @Roles(Role.Admin)
  @UseGuards(JwtGuard, RolesGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'This api is for update different service' })
  @Put('/:serviceId')
  @ApiParam({ example: 1, name: 'serviceId', required: true })
  updateService(
    @Param('serviceId') serviceId: number,
    @Body() dto: UpdateServiceDto,
  ): Promise<StatusRO> {
    return this.serviceService.updateService(dto, serviceId);
  }

  @Roles(Role.Admin)
  @UseGuards(JwtGuard, RolesGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'This api is for delete different service' })
  @Delete('/:serviceId')
  @ApiParam({ example: 1, name: 'serviceId', required: true })
  deleteService(@Param('serviceId') serviceId: number): Promise<StatusRO> {
    return this.serviceService.deleteService(serviceId);
  }

  @Roles(Role.Admin)
  @UseGuards(JwtGuard, RolesGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'This api is for list different service' })
  @Post('/list')
  listService(@Body() dto: ListOfDataDto): Promise<StatusRO> {
    return this.serviceService.listService(dto);
  }
}
