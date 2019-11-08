import * as Yup from 'yup';

export default async (req, resp, next) => {
  try {
    const schema = Yup.object()
      .shape({
        name: Yup.string(),
        email: Yup.string().email(),
        age: Yup.number(),
        weight: Yup.number(),
        height: Yup.number(),
      })
      .required('boy requ');

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (err) {
    return resp
      .status(400)
      .json({ error: 'Validation fails', messages: err.inner });
  }
};
