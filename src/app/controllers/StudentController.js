import Student from '../models/Student';

class StudentController {
  async store(req, resp) {
    const student = await Student.create(req.body);

    return resp.json(student);
  }
}

export default new StudentController();
