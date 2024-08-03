import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { AddDealDto } from './dto/create-deal.dto';
import { UpdateDealDto } from './dto/update-deal.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Deal } from 'src/models/deal.model';
import { DbService } from 'src/libs/services/db.service';
import { Messages } from 'src/libs/utils/message';
import { ResponseData } from 'src/libs/utils/enums';
import { HandleResponse } from 'src/libs/helper/handleResponse';
import { ListOfDataDto } from 'src/auth-user/dto/listOfData.dto';
import { StatusRO } from 'src/libs/utils/interface';
import { Package } from 'src/models/package.model';

@Injectable()
export class DealService {

  constructor(
    @InjectModel(Deal) private dealModel: typeof Deal,
    @InjectModel(Package) private packageModel: typeof Package,
    private dbService: DbService,
  ) {}

  async create(createDealDto: AddDealDto, req: any): Promise<StatusRO> {
    const userId = req.user.id;
    let insertDeal = {
      auth_id: userId,
      ...createDealDto
    }

    const addPackage = await this.dbService.create(this.dealModel, insertDeal)

    Logger.log(`Deal is ${Messages.ADD_SUCCESS}`)
    return HandleResponse(HttpStatus.CREATED, ResponseData.SUCCESS, `Deal is ${Messages.ADD_SUCCESS}`, addPackage.id)
  }

  async update(updateDealDto: UpdateDealDto, packageId: number): Promise<StatusRO> {
    await this.dbService.update(
      this.dealModel,
      { ...updateDealDto },
      { id: packageId },
      null,
      { message: Messages.NOT_FOUND },
      true
    )

    Logger.log(`Deal is ${Messages.UPDATE_SUCCESS}`)
    return HandleResponse(HttpStatus.ACCEPTED, ResponseData.SUCCESS, `Deal is ${Messages.UPDATE_SUCCESS}`)
  }

  async findAll(dto: ListOfDataDto): Promise<StatusRO> {

    let include = [
     {
      model: this.packageModel,
      attributes: ['id', 'package_name', 'package_duration', 'package_amount', 'package_image']
     }
    ]

    const listOfDeal: any[] = await this.dbService.findAll(
      this.dealModel,
      {
        exclude: ['createdAt', 'updatedAt', 'is_deleted'],
        ...(dto.selectionCriteria ?? {}),
      },
      {
        ...(dto.condition ?? {}),
      },
      [['createdAt', 'DESC']],
      include,
      { message: Messages.NOT_FOUND },
    )

    Logger.log(`List of deal ${Messages.GET_SUCCESS}`)
    return HandleResponse(HttpStatus.OK, ResponseData.SUCCESS, undefined, listOfDeal)
  }

  async delete(dealId: number): Promise<StatusRO> {
    await this.dbService.update(this.dealModel, { is_deleted: true }, { id: dealId }, null, {
      message: Messages.NOT_FOUND,
    })

    Logger.log(`Deal is ${Messages.DELETE_SUCCESS}`)
    return HandleResponse(HttpStatus.OK, ResponseData.SUCCESS, `Deal is ${Messages.DELETE_SUCCESS}`)
  }
}
