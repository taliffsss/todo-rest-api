import { Sequelize, Dialect } from 'sequelize';
import { IDatabaseClient } from '../interfaces/interface'

class Database implements IDatabaseClient {
  private sequelize: Sequelize;

  constructor(
    private dbName: string,
    private dbUser: string,
    private dbPassword: string,
    private dbHost: string,
    private dbDialect: string
  ) {
    this.sequelize = new Sequelize(dbName, dbUser, dbPassword, {
      host: dbHost,
      dialect: dbDialect as Dialect,  // cast dbDialect to type Dialect
    });
  }

  public getSequelize(): Sequelize {
    return this.sequelize;
  }

  async connect(): Promise<void> {
    try {
      await this.sequelize.authenticate();
      console.log('Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  }

  async disconnect(): Promise<void> {
    await this.sequelize.close();
  }
}

export default Database;
