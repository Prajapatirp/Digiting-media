import * as moment from 'moment';
import { Op } from 'sequelize';

export function Filter(
  startDate: Date,
  endDate: Date,
  employeeName: string,
  status: string,
  resourceName: string,
  technologyName: string,
  selectionStatus: string,
) {
  let search: any = { isDeleted: 0 };
  let value: any = { isDeleted: 0 };

  if (startDate) {
    search.createdAt = {
      [Op.gte]: moment(startDate).format('YYYY-MM-DD'),
    };
  }

  if (endDate) {
    search.createdAt = { [Op.lte]: moment(endDate).format('YYYY-MM-DD') };
  }

  if (startDate && endDate) {
    search.createdAt = {
      [Op.and]: {
        [Op.gte]: moment(startDate).format('YYYY-MM-DD'),
        [Op.lte]: moment(endDate).format('YYYY-MM-DD'),
      },
    };
  }

  if (status) {
    search.status = status;
  }

  if (employeeName) {
    value.firstName = employeeName;
  }

  if (resourceName) {
    value.resourceName = resourceName;
  }

  if (technologyName) {
    value.designation = technologyName;
  }

  if (selectionStatus) {
    search.status = selectionStatus;
  }

  return {
    search,
    value,
  };
};