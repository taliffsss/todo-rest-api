import { Model, DataTypes, Sequelize } from 'sequelize';

export class Todo extends Model {
  public id!: number;
  public title!: string;
  public done!: boolean;

  static initialize(sequelize: Sequelize) {
    this.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        title: {
          type: new DataTypes.STRING(128),
          allowNull: false,
        },
        done: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
      },
      {
        tableName: 'todos',
        sequelize: sequelize,
      }
    );
  }
}
