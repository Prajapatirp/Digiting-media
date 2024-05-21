import { MaxLength } from 'class-validator';
import { Sequelize } from 'sequelize';
import {
  AllowNull,
  Column,
  Default,
  Model,
  Table,
  Unique,
} from 'sequelize-typescript';

@Table({ tableName: 'Otp' })
export class Otp extends Model<Otp> {
  @AllowNull(false)
  @Unique
  @MaxLength(50)
  @Column
  email: string;

  @AllowNull(false)
  @Column
  otp: number;

  @AllowNull(false)
  @Column
  expiration_time: Date;

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
}
