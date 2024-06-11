import { Controller, Post, Body, Param, UseGuards, HttpCode, HttpStatus, Req, Put, Delete } from '@nestjs/common';
import { DealService } from './deal.service';
import { AddDealDto } from './dto/create-deal.dto';
import { UpdateDealDto } from './dto/update-deal.dto';
import { Roles } from 'src/libs/services/auth/decorators/roles.decorator';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ModuleName, Role } from 'src/libs/utils/enums';
import { JwtGuard } from 'src/libs/services/auth/guard/jwt.guard';
import { RolesGuard } from 'src/libs/services/auth/guard/roles.guard';
import { ListOfDataDto } from 'src/auth-user/dto/listOfData.dto';

@Controller('deal')
export class DealController {
  constructor(private readonly dealService: DealService) {}

  @ApiTags(ModuleName.Deal)
  @Roles(Role.Admin, Role.Dealer)
  @UseGuards(JwtGuard, RolesGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'This api is for add different deal' })
  @Post('/')
  create(@Body() createDealDto: AddDealDto, @Req() req: any) {
    return this.dealService.create(createDealDto, req);
  }

  @ApiTags(ModuleName.Deal)
  @Roles(Role.Admin, Role.Dealer)
  @UseGuards(JwtGuard, RolesGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'This api is for update different deal' })
  @Put('/:dealId')
  update(@Param('dealId') id: number, @Body() updateDealDto: UpdateDealDto) {
    return this.dealService.update(updateDealDto, id);
  }

  @ApiTags(ModuleName.Deal)
  @Roles(Role.Admin, Role.Dealer)
  @UseGuards(JwtGuard, RolesGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'This api is for list of deal' })
  @Post('/listOfDeal')
  findAll(@Body() listOfData: ListOfDataDto) {
    return this.dealService.findAll(listOfData);
  }

  @ApiTags(ModuleName.Deal)
  @Roles(Role.Admin, Role.Dealer)
  @UseGuards(JwtGuard, RolesGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'This api is for list of deal' })
  @Delete('/:dealId')
  delete(@Param('dealId') id: number) {
    return this.dealService.delete(id);
  }
}
