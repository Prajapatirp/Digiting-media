import { MaxLength } from 'class-validator';
import { DataTypes } from 'sequelize';
import { AllowNull, Column, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'ContactUs' })
export class ContactUs extends Model<ContactUs> {
  @AllowNull(false)
  @MaxLength(50)
  @Column
  name: string;

  @AllowNull(true)
  @MaxLength(50)
  @Column
  email: string;

  @AllowNull(false)
  @Column
  @MaxLength(12)
  mobile_no: number;

  @AllowNull(false)
  @MaxLength(50)
  @Column
  subject: string;

  @AllowNull(true)
  @Column({ type: DataTypes.TEXT })
  messages: string;
}
