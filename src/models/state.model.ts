import { Sequelize } from 'sequelize';
import { Column, Model, Table, Default, AllowNull } from 'sequelize-typescript';

@Table({ tableName: 'State' })
export class State extends Model<State> {
  @AllowNull(false)
  @Column
  state_name: string;

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
