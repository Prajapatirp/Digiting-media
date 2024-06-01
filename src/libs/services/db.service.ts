import { HttpStatus, Injectable } from '@nestjs/common';
import { HandleResponse } from '../helper/handleResponse';
import { ResponseData } from '../utils/enums';

@Injectable()
export class DbService {
  async findOne(
    collection: any,
    condition?: any,
    selectAttribute?: any[],
    errorMessage?: { message: string },
    include?: any[],
    order?: any[],
  ) {
    const result = await collection.findOne({
      attributes: selectAttribute,
      where: condition,
      include,
      order,
    });

    if (errorMessage && !result) {
      throw HandleResponse(
        HttpStatus.NOT_FOUND,
        ResponseData.ERROR,
        errorMessage.message
      );
    }

    return result;
  }

  async create(
    collection: any,
    insertData: any,
    transaction?: any,
  ) {
    return collection.create(insertData, { transaction });
  }

  async update(
    collection: any,
    selection: any,
    condition: any,
    transaction?: any,
    errorMessage?: { message: string },
    isSoftDelete?: boolean,
  ) {
    if (isSoftDelete) {
      condition.is_deleted = false;
    }

    const result = await collection.update(
      selection,
      {
        where: condition,
      },
      { transaction },
    );

    if (errorMessage && result[0] === 0) {
      throw HandleResponse(
        HttpStatus.NOT_FOUND,
        ResponseData.ERROR,
        errorMessage.message
      );
    }

    return result;
  }

  async count(collection?: any, condition?: any) {
    return collection.count({ where: condition });
  }

  async findAll(
    collection: any,
    selectAttribute?: any,
    condition?: any,
    order?: any[],
    include?: any[],
    errorMessage?: { message: string }
  ) {
    const result = await collection.findAll({
      attributes: selectAttribute,
      where: condition,
      order,
      include,
      errorMessage,
    });

    if (errorMessage && result.length === 0) {
      throw HandleResponse(
        HttpStatus.NOT_FOUND,
        ResponseData.ERROR,
        errorMessage.message
      );
    }
    return result;
  }

  async bulkCreate(
    modelClass: any,
    insertData: any,
    transaction?: any,
  ): Promise<number[]> {
    const createdEntities = await modelClass.bulkCreate(insertData, {
      transaction,
    });
    return createdEntities.map((entity: any) => entity.id);
  }

  async destroy(
    collection: any,
    condition: any,
    errorMessage?: { message: string },
  ) {
    const result = collection.destroy({
      where: condition,
    });

    if (errorMessage && result === 0) {
      throw HandleResponse(
        HttpStatus.NOT_FOUND,
        ResponseData.ERROR,
        errorMessage.message
      );
    }

    return result;
  }
}
