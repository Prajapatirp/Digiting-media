import { Sequelize } from 'sequelize';
import {
  Column,
  Model,
  Table,
  Default,
  AllowNull,
  ForeignKey,
  DataType,
} from 'sequelize-typescript';
import { AuthUser } from './authUser.model';
import { MaxLength } from 'class-validator';

@Table({ tableName: 'Package' })
export class Package extends Model<Package> {
  @ForeignKey(() => AuthUser)
  @AllowNull(false)
  @MaxLength(11)
  @Column
  auth_id: number;

  @AllowNull(false)
  @MaxLength(50)
  @Column
  package_name: string;

  @AllowNull(false)
  @MaxLength(10)
  @Column
  package_duration: string;

  @AllowNull(false)
  @MaxLength(50)
  @Column(DataType.DECIMAL)
  package_amount: number;
  
  @AllowNull(true)
  @Column(DataType.TEXT)
  package_description: string;

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
}
