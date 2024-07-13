import { DataTypes, Model } from 'sequelize';
import util from 'util';
import connectToDB from './db.js';

const db = await connectToDB('postgresql:///animals');

export class Human extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
  getFullName() {
    return `${this.fname} ${this.lname}`;
  }
  static init(sequelize) {
    return super.init({
      human_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      fname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    }, {
      sequelize,
      modelName: 'human',
      tableName: 'humans',
      timestamps: false
    });
  }
}
export class Animal extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }

  static init(sequelize) {
    return super.init({
      animal_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      species: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      birth_year: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      human_id: {
        type: DataTypes.INTEGER,
        references: {
          model: Human,
          key: 'human_id',
        },
        allowNull: true
      }
    }, {
      sequelize,
      modelName: 'animal',
      tableName: 'animals',
      timestamps: false
    });
  }
}
Human.init(db);
Animal.init(db);

Human.hasMany(Animal, { foreignKey: 'human_id' });
Animal.belongsTo(Human, { foreignKey: 'human_id' });

(async () => {
  await db.sync();
})();


export default db;
