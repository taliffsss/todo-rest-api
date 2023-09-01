import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../db/database';

export class Todo extends Model {
  public id!: number;
  public title!: string;
  public done!: boolean;
}

Todo.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    title: {
      type: new DataTypes.STRING(128),
      allowNull: false
    },
    done: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  },
  {
    tableName: 'todos',
    sequelize: sequelize
  }
);
