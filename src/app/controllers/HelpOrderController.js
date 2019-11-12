import { Op } from 'sequelize';
import HelpOrder from '../models/HelpOrder';

class HelpOrderController {
  async index(req, resp) {
    const { all } = req.query;
    const where = { answer: { [Op.ne]: null } };

    if (all === 'y') {
      delete where.answer;
    }

    const helpOrders = await HelpOrder.findAll({ where });

    return resp.json(helpOrders);
  }

  async store(req, resp) {
    const { helpOrderId } = req.params;
    const { answer } = req.body;

    const helpOrder = await HelpOrder.findByPk(helpOrderId);

    if (!helpOrder) {
      return resp.status(400).json({ error: 'HelpOrder not found' });
    }

    helpOrder.answer = answer;
    helpOrder.answerAt = new Date();

    await helpOrder.save();

    return resp.json(helpOrder);
  }
}

export default new HelpOrderController();
