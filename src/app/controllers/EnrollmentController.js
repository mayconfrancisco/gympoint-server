import { parseISO, addMonths } from 'date-fns';

import Enrollment from '../models/Enrollment';
import Plan from '../models/Plan';

class EnrollmentController {
  /**
   * Store
   */
  async store(req, resp) {
    const { planId, startDate } = req.body;

    const plan = await Plan.findByPk(planId);

    if (!plan) {
      return resp.json({ error: 'Plan not found' });
    }

    let endDate = null;
    let { price } = plan;

    if (plan.duration) {
      endDate = addMonths(parseISO(startDate), plan.duration);

      price = plan.price * plan.duration;
    }

    const enrollment = await Enrollment.create({
      ...req.body,
      endDate,
      price,
    });

    // TODO - add envio de email para aluno

    return resp.json(enrollment);
  }

  /**
   * Index
   */
  async index(req, resp) {
    const enrollments = await Enrollment.findAll();

    resp.json(enrollments);
  }
}

export default new EnrollmentController();
