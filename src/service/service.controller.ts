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
import { UpdatePackageDto } from './dto/updatePackage.dto';
import { AddPackageDto } from './dto/addPackage.dto';
import { ListOfDataDto } from 'src/auth-user/dto/listOfData.dto';

@Controller('package')
@ApiTags(ModuleName.package)
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Roles(Role.Admin)
  @UseGuards(JwtGuard, RolesGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'This api is for add different package' })
  @Post('')
  addPackage(@Body() dto: AddPackageDto, @Req() req: any): Promise<StatusRO> {
    return this.serviceService.addPackage(dto, req);
  }

  @Roles(Role.Admin)
  @UseGuards(JwtGuard, RolesGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'This api is for update different package' })
  @Put('/:packageId')
  @ApiParam({ example: 1, name: 'packageId', required: true })
  updatePackage(
    @Param('packageId') packageId: number,
    @Body() dto: UpdatePackageDto,
  ): Promise<StatusRO> {
    return this.serviceService.updatePackage(dto, packageId);
  }

  @Roles(Role.Admin)
  @UseGuards(JwtGuard, RolesGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'This api is for delete different package' })
  @Delete('/:packageId')
  @ApiParam({ example: 1, name: 'packageId', required: true })
  deletePackage(@Param('packageId') packageId: number): Promise<StatusRO> {
    return this.serviceService.deletePackage(packageId);
  }

  @Roles(Role.Admin)
  @UseGuards(JwtGuard, RolesGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'This api is for list different package' })
  @Post('/list')
  listPackage(@Body() dto: ListOfDataDto): Promise<StatusRO> {
    return this.serviceService.listPackage(dto);
  }
}
