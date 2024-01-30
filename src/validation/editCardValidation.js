import Joi from "joi";
import { validateEmailLogin } from "./loginValidation";

const titleSchema = Joi.object({
  title: Joi.string().min(2).max(256).required(),
});

const subtitleSchema = Joi.object({
  subtitle: Joi.string().min(2).max(256).required(),
});

const descriptionSchema = Joi.object({
  description: Joi.string().min(2).max(1024).required(),
});

const phoneSchema = Joi.object({
  phone: Joi.string().min(9).max(11).required(),
});

const urlSchema = Joi.object({
  url: Joi.string().min(14).required(),
});

const countrySchema = Joi.object({
  country: Joi.string().required(),
});
const citySchema = Joi.object({
  city: Joi.string().required(),
});

const streetSchema = Joi.object({
  street: Joi.string().required(),
});

const houseNumberSchema = Joi.object({
  houseNumber: Joi.number().integer().required(),
});

const validateTitleSchema = (title) => titleSchema.validate(title);
const validateSubTitleSchema = (subtitle) => subtitleSchema.validate(subtitle);
const validateDescriptionSchema = (description) =>
  descriptionSchema.validate(description);
const validatePhoneSchema = (phone) => phoneSchema.validate(phone);
const validateUrlSchema = (url) => urlSchema.validate(url);
const validateCountrySchema = (country) => countrySchema.validate(country);
const validateCitySchema = (city) => citySchema.validate(city);
const validateStreetSchema = (street) => streetSchema.validate(street);
const validateHouseNumberSchema = (houseNumber) =>
  houseNumberSchema.validate(houseNumber);

const validateEditCardSchema = {
  title: validateTitleSchema,
  subtitle: validateSubTitleSchema,
  description: validateDescriptionSchema,
  phone: validatePhoneSchema,
  email: validateEmailLogin,
  url: validateUrlSchema,
  country: validateCountrySchema,
  city: validateCitySchema,
  street: validateStreetSchema,
  houseNumber: validateHouseNumberSchema,
};

export { validateEditCardSchema };
