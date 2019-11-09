import Sequelize, { Model } from 'sequelize';

class Enrollment extends Model {
  static init(sequelize) {
    super.init(
      {
        startDate: Sequelize.DATE,
        endDate: Sequelize.DATE,
        price: Sequelize.FLOAT,
      },
      {
        sequelize,
      },
    );

    return this;
  }
}

export default Enrollment;
