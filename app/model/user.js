const { ROLE } = require('../utils/enum');

module.exports = (sequelize, Sequelize) => {
  return sequelize.define(
    'AuthUser',
    {
      id: {
        type: Sequelize.INTEGER(11),
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      first_name: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      last_name: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      middle_name: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      email_id: {
        type: Sequelize.STRING(50),
        unique: true,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      phone_no: {
        type: Sequelize.STRING(15),
        unique: true,
        allowNull: false,
      },
      profile_image: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      role: {
        type: Sequelize.STRING(10),
        isIn: [ROLE.SALE, ROLE.ADMIN],
        allowNull: false,
      },
      created_at: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false,
      },
      updated_at: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false,
      },
      is_active: {
        type: Sequelize.BOOLEAN(1),
        defaultValue: false,
      },
      is_deleted: {
        type: Sequelize.BOOLEAN(1),
        defaultValue: false,
      },
    },
    { freezeTableName: true, timestamps: false }
  );
};