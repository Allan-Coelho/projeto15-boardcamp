import Joi from "joi";

const customerSchema = Joi.object({
  name: Joi.string().min(0).required(),
  phone: Joi.string()
    .min(10)
    .max(11)
    .pattern(/^[0-9]+$/)
    .required(),
  cpf: Joi.string()
    .min(11)
    .max(11)
    .pattern(/^[0-9]+$/)
    .required(),
  birthday: Joi.date().required(),
});

export { customerSchema };
