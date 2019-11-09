import Sequelize, { Model } from 'sequelize';

class Enrollment extends Model {
  static init(sequelize) {
    super.init(
      {
        studentId: Sequelize.INTEGER,
        planId: Sequelize.INTEGER,
        startDate: Sequelize.DATE,
        endDate: Sequelize.DATE,
        price: Sequelize.FLOAT,
        canceledAt: Sequelize.DATE,
      },
      {
        sequelize,
      },
    );

    return this;
  }
}

export default Enrollment;
