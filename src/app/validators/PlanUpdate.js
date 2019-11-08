import * as Yup from 'yup';

export default async (req, resp, next) => {
  try {
    const schema = Yup.object().shape({
      params: Yup.object().shape({
        planId: Yup.number(),
      }),
      body: Yup.object().shape({
        title: Yup.string(),
        duration: Yup.number(),
        price: Yup.number(),
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
