import { HttpStatus, Injectable, Logger } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { DbService } from 'src/libs/services/db.service'
import { StatusRO } from 'src/libs/utils/interface'
import { HandleResponse } from 'src/libs/helper/handleResponse'
import { ResponseData } from 'src/libs/utils/enums'
import { Messages } from 'src/libs/utils/message'
import { UpdatePackageDto } from './dto/updatePackage.dto'
import { AddPackageDto } from './dto/addPackage.dto'
import { ListOfDataDto } from 'src/auth-user/dto/listOfData.dto'
import { Package } from 'src/models/package.model'

@Injectable()
export class ServiceService {
  constructor(
    @InjectModel(Package) private serviceModel: typeof Package,
    private dbService: DbService,
  ) {}

  async addPackage(AddPackageDto: AddPackageDto, req: any): Promise<StatusRO> {
    const { package_name, package_duration, package_amount, package_description, package_image } = AddPackageDto
    const authId = req?.user?.id

    const createPackage = {
      package_name,
      package_duration,
      package_amount,
      package_description,
      package_image,
      auth_id: authId,
    }

    const addPackage = await this.dbService.create(this.serviceModel, createPackage)

    Logger.log(`Package is ${Messages.ADD_SUCCESS}`)
    return HandleResponse(HttpStatus.CREATED, ResponseData.SUCCESS, `Package is ${Messages.ADD_SUCCESS}`, addPackage.id)
  }

  async updatePackage(updatePackageDto: UpdatePackageDto, packageId: number): Promise<StatusRO> {
    await this.dbService.update(
      this.serviceModel,
      { ...updatePackageDto },
      { id: packageId },
      null,
      { message: Messages.NOT_FOUND },
      true,
    )

    Logger.log(`Package is ${Messages.UPDATE_SUCCESS}`)
    return HandleResponse(HttpStatus.CREATED, ResponseData.SUCCESS, `Package is ${Messages.UPDATE_SUCCESS}`)
  }

  async deletePackage(packageId: number): Promise<StatusRO> {
    await this.dbService.update(this.serviceModel, { is_deleted: true }, { id: packageId }, null, {
      message: Messages.NOT_FOUND,
    })

    Logger.log(`Package is ${Messages.DELETE_SUCCESS}`)
    return HandleResponse(HttpStatus.OK, ResponseData.SUCCESS, `Package is ${Messages.DELETED_SUCCESS}`)
  }

  async listPackage(dto: ListOfDataDto): Promise<StatusRO> {
    const listOfService: any[] = await this.dbService.findAll(
      this.serviceModel,
      {
        exclude: ['createdAt', 'updatedAt', 'is_deleted'],
        ...(dto.selectionCriteria ?? {}),
      },
      {
        ...(dto.condition ?? {}),
      },
      [['createdAt', 'DESC']],
      null,
      { message: Messages.NOT_FOUND },
    )

    Logger.log(`List of package ${Messages.GET_SUCCESS}`)
    return HandleResponse(HttpStatus.OK, ResponseData.SUCCESS, undefined, listOfService)
  }
}
