import { DataTypes, Sequelize } from 'sequelize';
import {
  Column,
  Model,
  Table,
  Default,
  AllowNull,
  ForeignKey,
  DataType,
  Unique,
  BelongsTo,
} from 'sequelize-typescript';
import { AuthUser } from './authUser.model';
import { MaxLength } from 'class-validator';
import { Package } from './package.model';
import { DealStatus } from 'src/libs/utils/enums';

@Table({ tableName: 'Deal' })
export class Deal extends Model<Deal> {
  @ForeignKey(() => AuthUser)
  @AllowNull(false)
  @MaxLength(11)
  @Column
  auth_id: number;

  @ForeignKey(() => Package)
  @AllowNull(false)
  @MaxLength(11)
  @Column
  package_id: number;

  @AllowNull(false)
  @MaxLength(50)
  @Column
  company_name: string;

  @AllowNull(false)
  @MaxLength(50)
  @Column
  customer_name: string;

  @AllowNull(false)
  @MaxLength(15)
  @Column
  owner_mobile: string;

  @AllowNull(false)
  @MaxLength(15)
  @Column
  inquiry_number: string;

  @AllowNull(false)
  @Unique
  @MaxLength(50)
  @Column
  email: string;

  @AllowNull(false)
  @MaxLength(50)
  @Column
  pin_code: string;

  @AllowNull(true)
  @MaxLength(50)
  @Column
  month: string;

  @AllowNull(false)
  @MaxLength(50)
  @Column(DataType.FLOAT)
  payment: number;
  
  @AllowNull(true)
  @Column(DataType.TEXT)
  address: string;

  @AllowNull(true)
  @Column(DataType.TEXT)
  package_details: string;

  @AllowNull(false)
  @Column
  @MaxLength(50)
  payment_duration: string;

  @Column({ defaultValue: false })
  is_listing: boolean;

  @AllowNull(true)
  @Column(DataType.TEXT)
  description: string;

  @AllowNull(false)
  @Column(DataType.DATE)
  contract_date: Date;

  @AllowNull(false)
  @Column(DataType.DATE)
  contract_end_date: Date;

  @AllowNull(false)
  @MaxLength(100)
  @Column
  contract_images: string;

  @AllowNull(false)
  @MaxLength(100)
  @Column
  check_image: string;

  @AllowNull(false)
  @Column({
    type: DataTypes.ENUM(
        DealStatus.open,
        DealStatus.close,
    ),
  })
  status: string;

  @Default(Sequelize.literal('CURRENT_TIMESTAMP'))
  @Column({ type: 'TIMESTAMP' })
  createdAt: Date;

  @Default(Sequelize.literal('CURRENT_TIMESTAMP'))
  @Column({
    type: 'TIMESTAMP',
    defaultValue: Sequelize.literal(
      'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP',
    ),
  })
  updatedAt: Date;

  @Column({ defaultValue: false })
  is_deleted: boolean;

  @BelongsTo(() => Package)
  package: Package;
}
