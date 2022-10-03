import Joi from "joi";

const categorySchema = Joi.object({
  name: Joi.string().min(0).required(),
});

export { categorySchema };
