import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { DbService } from 'src/libs/services/db.service';
import { StatusRO } from 'src/libs/utils/interface';
import { ServiceModel } from 'src/libs/utils/modelInterface';
import { HandleResponse } from 'src/libs/helper/handleResponse';
import { ResponseData } from 'src/libs/utils/enums';
import { Messages } from 'src/libs/utils/message';
import { UpdateServiceDto } from './dto/updateService.dto';
import { AddServiceDto } from './dto/addService.dto';
import { ListOfDataDto } from 'src/auth-user/dto/listOfData.dto';
import { Package } from 'src/models/package.model';

@Injectable()
export class ServiceService {
  constructor(
    @InjectModel(Package) private serviceModel: typeof Package,
    private dbService: DbService,
  ) {}

  async addService(addServiceDto: AddServiceDto): Promise<StatusRO> {
    const { serviceName } = addServiceDto;

    const addService: ServiceModel = await this.dbService.create(
      this.serviceModel,
      { service_name: serviceName },
    );

    Logger.log(`Service is ${Messages.ADD_SUCCESS}`);
    return HandleResponse(
      HttpStatus.CREATED,
      ResponseData.SUCCESS,
      `Service is ${Messages.ADD_SUCCESS}`,
      addService.id,
      undefined,
    );
  }

  async updateService(
    updateServiceDto: UpdateServiceDto,
    serviceId: number,
  ): Promise<StatusRO> {
    const { serviceName } = updateServiceDto;

    const updateService: ServiceModel = await this.dbService.update(
      this.serviceModel,
      { service_name: serviceName },
      { id: serviceId },
      null,
      { message: Messages.NOT_FOUND },
      true,
    );

    Logger.log(`Service is ${Messages.UPDATE_SUCCESS}`);
    return HandleResponse(
      HttpStatus.CREATED,
      ResponseData.SUCCESS,
      `Service is ${Messages.UPDATE_SUCCESS}`,
      undefined,
      undefined,
    );
  }

  async deleteService(serviceId: number): Promise<StatusRO> {
    const deleteService: ServiceModel = await this.dbService.update(
      this.serviceModel,
      { is_deleted: true },
      { id: serviceId },
      null,
      { message: Messages.NOT_FOUND },
    );

    Logger.log(`Service is ${Messages.DELETE_SUCCESS}`);
    return HandleResponse(
      HttpStatus.OK,
      ResponseData.SUCCESS,
      `Service is ${Messages.DELETED_SUCCESS}`,
      undefined,
      undefined,
    );
  }

  async listService(dto: ListOfDataDto): Promise<StatusRO> {
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
      true,
    );

    Logger.log(`List of services ${Messages.GET_SUCCESS}`);
    return HandleResponse(
      HttpStatus.OK,
      ResponseData.SUCCESS,
      undefined,
      listOfService,
      undefined,
    );
  }
}
