import Joi from "joi";

export const passengerSchema = Joi.object({
    firstName: Joi.string()
      .min(2)
      .max(100)
      .required(),
    lastName: Joi.string()
      .min(2)
      .max(100)
      .required(),
  });

export const citySchema = Joi.object({
    name: Joi.string()
      .min(2)
      .max(50)
      .required()
  });

export const flightSchema = Joi.object({
    origin: Joi.number().required(),
    destination: Joi.number().required(),
    date: Joi.string()
      .pattern(/^(\d{2}-\d{2}-\d{4})$/)
      .required()
  });

export const travelSchema = Joi.object({
  passengerId: Joi.number().required(),
  flightId: Joi.number().required()
})