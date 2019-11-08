import * as Yup from 'yup';

export default async (req, resp, next) => {
  try {
    const schema = Yup.object().shape({
      planId: Yup.number(),
    });

    await schema.validate(req.params, { abortEarly: false });

    return next();
  } catch (err) {
    return resp
      .status(400)
      .json({ error: 'Validation Fails', messages: err.inner });
  }
};
