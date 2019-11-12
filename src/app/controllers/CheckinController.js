import { Op } from 'sequelize';
import { subDays } from 'date-fns';
import Checkin from '../models/Checkin';

class CheckinController {
  /**
   * Store
   */
  async store(req, resp) {
    const { studentId } = req.params;

    const dateFilter = subDays(new Date(), 7);

    const checkins = await Checkin.findAndCountAll({
      where: { studentId, createdAt: { [Op.gt]: dateFilter } },
    });

    if (checkins.count >= 5) {
      return resp.status(401).json({ error: 'Check in limit reached' });
    }

    const checkin = await Checkin.create({ studentId });

    return resp.json(checkin);
  }

  /**
   * Index
   */
  async index(req, resp) {
    const { studentId } = req.params;
    const checkins = await Checkin.findAll({ where: { studentId } });
    return resp.json(checkins);
  }
}

export default new CheckinController();
