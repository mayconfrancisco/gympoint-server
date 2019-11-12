import { Op } from 'sequelize';
import HelpOrder from '../models/HelpOrder';

import AnswerMail from '../jobs/AnswerMail';
import Queue from '../../lib/Queue';

class HelpOrderController {
  async index(req, resp) {
    const { all } = req.query;
    const where = { answer: { [Op.eq]: null } };

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

    const student = await helpOrder.getStudent();
    helpOrder.setDataValue('student', {
      name: student.name,
      email: student.email,
    });

    Queue.add(AnswerMail.key, { helpOrder });

    return resp.json(helpOrder);
  }
}

export default new HelpOrderController();
