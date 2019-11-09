import * as Yup from 'yup';

export default async (req, resp, next) => {
  try {
    const schema = Yup.object().shape({
      params: Yup.object().shape({
        enrollmentId: Yup.number(),
      }),
      body: Yup.object().shape({
        studentId: Yup.number(),
        planId: Yup.number(),
        startDate: Yup.date(),
        endDate: Yup.date(),
        price: Yup.number(),
      }),
    });

    await schema.validate(req, { abortEarly: false });

    return next();
  } catch (err) {
    return resp
      .status(400)
      .json({ error: 'Validation fails', messages: err.inner });
  }
};
