import { Op } from 'sequelize';
import Student from '../models/Student';

class StudentController {
  /**
   * STORE
   */
  async store(req, resp) {
    const student = await Student.create(req.body);

    return resp.json(student);
  }

  /**
   * INDEX
   */
  async index(req, resp) {
    const { q } = req.query;
    const where = {};

    if (q) {
      where.name = { [Op.like]: `%${q}%` };
    }

    const students = await Student.findAll({ where });

    return resp.json(students);
  }

  /**
   * UPDATE
   */
  async update(req, resp) {
    const { studentId } = req.params;
    const { email } = req.body;

    const student = await Student.findByPk(studentId);

    if (!student) {
      return resp.status(400).json({ error: 'User is not exist' });
    }

    if (email && email !== student.email) {
      const emailExist = await Student.findOne({ where: { email } });

      if (emailExist) {
        return resp.status(400).json({ error: 'Email already exists' });
      }
    }

    await student.update(req.body);

    return resp.json(student);
  }
}

export default new StudentController();
