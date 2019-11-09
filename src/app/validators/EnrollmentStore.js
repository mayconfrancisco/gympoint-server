import * as Yup from 'yup';

export default async (req, resp, next) => {
  try {
    const schema = Yup.object().shape({
      studentId: Yup.number().required(),
      planId: Yup.number().required(),
      startDate: Yup.date().required(),
    });

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (err) {
    return resp
      .status(400)
      .json({ error: 'Validation fails', messages: err.inner });
  }
};
