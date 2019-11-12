import * as Yup from 'yup';

export default async (req, resp, next) => {
  try {
    const schema = Yup.object().shape({
      params: Yup.object().shape({
        helpOrderId: Yup.number(),
      }),
      body: Yup.object().shape({
        answer: Yup.string()
          .min(3)
          .required(),
      }),
    });

    await schema.validate(req, { abortEarly: false });

    return next();
  } catch (err) {
    return resp
      .status(400)
      .json({ error: 'Validation Fails', messages: err.inner });
  }
};
