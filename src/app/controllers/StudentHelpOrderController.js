import HelpOrder from '../models/HelpOrder';

class StudentHelpOrderController {
  async store(req, resp) {
    const { studentId } = req.params;
    const { question } = req.body;

    const helpOrder = await HelpOrder.create({ studentId, question });

    return resp.json(helpOrder);
  }

  async index(req, resp) {
    const { studentId } = req.params;

    const helpOrders = await HelpOrder.findAll({ where: { studentId } });

    return resp.json(helpOrders);
  }
}

export default new StudentHelpOrderController();
