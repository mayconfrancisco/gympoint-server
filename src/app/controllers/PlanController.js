import Plan from '../models/Plan';

class PlanController {
  /**
   * Store
   */
  async store(req, resp) {
    const plan = await Plan.create(req.body);
    return resp.json(plan);
  }

  /**
   * Index
   */
  async index(req, resp) {
    const plans = await Plan.findAll();
    return resp.json(plans);
  }

  /**
   * Update
   */
  async update(req, resp) {
    const { planId } = req.params;

    const plan = await Plan.findByPk(planId);

    if (!plan) {
      return resp.status(400).json({ error: 'Plan not found' });
    }

    await plan.update(req.body);

    return resp.json(plan);
  }

  /**
   * Delete
   */
  async delete(req, resp) {
    const { planId } = req.params;

    const plan = await Plan.findByPk(planId);

    if (!plan) {
      return resp.status(400).json({ error: 'Plan not found' });
    }

    if (plan && !plan.canceledAt) {
      plan.canceledAt = new Date();
      await plan.save();
    }

    return resp.json(plan);
  }
}

export default new PlanController();
