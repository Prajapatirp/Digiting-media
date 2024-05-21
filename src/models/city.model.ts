import { MaxLength } from 'class-validator';
import { Sequelize } from 'sequelize';
import {
  Column,
  Model,
  Table,
  Default,
  AllowNull,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { State } from './state.model';

@Table({ tableName: 'City' })
export class City extends Model<City> {
  @ForeignKey(() => State)
  @AllowNull(false)
  @MaxLength(11)
  @Column
  state_id: number;

  @AllowNull(false)
  @MaxLength(20)
  @Column
  city_name: string;

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

  @BelongsTo(() => State)
  state: State;
}
