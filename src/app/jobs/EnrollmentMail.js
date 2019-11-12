import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';

import Mail from '../../lib/Mail';

class EnrollmentMail {
  get key() {
    return 'EnrollmentMail';
  }

  async handle({ data }) {
    const { enrollment } = data;

    await Mail.sendMail({
      to: `${enrollment.student.name} <${enrollment.student.email}>`,
      subject: 'Bem vindo! Dados da sua matrícula',
      template: 'enrollment',
      context: {
        student: enrollment.student.name,
        plan: enrollment.plan.title,
        endDate: format(
          parseISO(enrollment.endDate),
          "'dia ' dd  'de' MMMM 'de' yyyy",
          { locale: pt },
        ),
        price: enrollment.price,
      },
    });
  }
}

export default new EnrollmentMail();
