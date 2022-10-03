import Joi from "joi";

const gameSchema = Joi.object({
  name: Joi.string().min(0).required(),
  image: Joi.string().uri().required(),
  stockTotal: Joi.number().integer().greater(0).required(),
  categoryId: Joi.number().integer().required(),
  pricePerDay: Joi.number().integer().greater(0).required(),
});

export { gameSchema };
