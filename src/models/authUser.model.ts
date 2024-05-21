import { MaxLength } from 'class-validator';
import { DataTypes, Sequelize } from 'sequelize';
import {
  AllowNull,
  Column,
  Default,
  Model,
  Table,
  Unique,
} from 'sequelize-typescript';
import { Role } from 'src/libs/utils/enums';

@Table({ tableName: 'AuthUser' })
export class AuthUser extends Model<AuthUser> {
  @AllowNull(false)
  @MaxLength(50)
  @Column
  first_name: string;

  @AllowNull(false)
  @MaxLength(50)
  @Column
  last_name: string;

  @AllowNull(false)
  @MaxLength(50)
  @Column
  middle_name: string;

  @AllowNull(true)
  @Unique
  @MaxLength(50)
  @Column
  email: string;

  @AllowNull(true)
  @MaxLength(150)
  @Column
  password: string;

  @AllowNull(false)
  @MaxLength(15)
  @Column
  phone_no: string;

  @AllowNull(false)
  @Column({
    type: DataTypes.ENUM(
      Role.Admin,
      Role.Dealer,
    ),
  })
  role: string;

  @AllowNull(true)
  @Column
  @MaxLength(255)
  profile_image: string;

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

  @MaxLength(1)
  @Column({ defaultValue: false })
  is_deleted: boolean;

  @MaxLength(1)
  @Column({ defaultValue: false })
  is_active: boolean;

}
