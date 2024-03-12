import { DataTypes } from 'sequelize';
import * as moment from 'moment-timezone';
import {
  Column,
  Model,
  Table,
  AutoIncrement,
  PrimaryKey,
  Unique,
  AllowNull,
} from 'sequelize-typescript';
import {
  CreateDateColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { Role } from 'src/utils/constants/roles';

@Table({tableName: 'AuthUser'})
export class AuthUser extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @AllowNull(false)
  @Column
  first_name: string;

  @AllowNull(false)
  @Column
  last_name: string;

  @AllowNull(false)
  @Column
  middle_ame: string

  @Unique
  @AllowNull(false)
  @Column
  email: string;

  @AllowNull(false)
  @Column
  password: string;

  @AllowNull(false)
  @Column
  contact_no: string;

  @AllowNull(false)
  @Column
  profile_image: string;

  @AllowNull(false)
  @Column({ type: DataTypes.ENUM(Role.Admin, Role.Sale, Role.Admin) })
  role: string;

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  updated_at: Date;

  @BeforeInsert()
  insertCreated() {
    this.created_at = new Date(
      moment().tz('America/Sao_Paulo').format('YYYY-MM-DD HH:mm:ss'),
    );
    this.updated_at = new Date(
      moment().tz('America/Sao_Paulo').format('YYYY-MM-DD HH:mm:ss'),
    );
  }

  @BeforeUpdate()
  insertUpdated() {
    this.updated_at = new Date(
      moment().tz('America/Sao_Paulo').format('YYYY-MM-DD HH:mm:ss'),
    );
  }

  @Column({ defaultValue: 0 })
  is_deleted: boolean;

//   @BelongsTo(() => Position)
//   position: Position;

//   @HasMany(() => TaskSheet)
//   taskSheet: TaskShe
}
