import Sequelize, { Model } from 'sequelize';
import { isAfter, isBefore } from 'date-fns';

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
        active: {
          type: Sequelize.VIRTUAL(Sequelize.BOOLEAN, [
            'start_date',
            'end_date',
          ]),
          get() {
            return (
              isBefore(this.get('start_date'), new Date()) &&
              isAfter(this.get('end_date'), new Date())
            );
          },
        },
      },
      {
        sequelize,
      },
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Plan, { foreignKey: 'planId' });
    this.belongsTo(models.Student, { foreignKey: 'studentId' });
  }
}

export default Enrollment;
