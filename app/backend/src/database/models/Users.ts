import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';

class Users extends Model {
  declare id: number;
  declare teamName: string;
}

Users.init({
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: STRING(50),
    allowNull: false,
  },
  role: {
    type: STRING(50),
    allowNull: false,
  },
  email: {
    type: STRING(50),
    allowNull: false,
  },
  password: {
    type: STRING(50),
    allowNull: false,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'users',
  timestamps: false,
});

export default Users;
