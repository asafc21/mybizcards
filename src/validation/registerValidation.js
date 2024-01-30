import Joi from "joi";
import { validateEmailLogin, validatePasswordLogin } from "./loginValidation";

const firstSchema = Joi.object({
  first: Joi.string().min(2).max(256).required(),
});

const lastSchema = Joi.object({
  last: Joi.string().min(2).max(256).required(),
});

const phoneSchema = Joi.object({
  phone: Joi.string().min(9).max(11).required(),
});

const countrySchema = Joi.object({
  country: Joi.string().min(2).max(256).required(),
});

const citySchema = Joi.object({
  city: Joi.string().min(2).max(256).required(),
});

const streetSchema = Joi.object({
  street: Joi.string().min(2).max(256).required(),
});

const houseNumberSchema = Joi.object({
  houseNumber: Joi.number().integer().required(),
});

const zipSchema = Joi.object({
  zip: Joi.number().integer().required(),
});

const validateFirstSchema = (first) => firstSchema.validate(first);
const validateLastSchema = (last) => lastSchema.validate(last);
const validatePhoneSchema = (phone) => phoneSchema.validate(phone);
const validateCountrySchema = (country) => countrySchema.validate(country);
const validateCitySchema = (city) => citySchema.validate(city);
const validateStreetSchema = (street) => streetSchema.validate(street);
const validateHouseNumberSchema = (houseNumber) =>
  houseNumberSchema.validate(houseNumber);
const validateZipSchema = (zip) => zipSchema.validate(zip);

const validateSchema = {
  first: validateFirstSchema,
  email: validateEmailLogin,
  password: validatePasswordLogin,
  last: validateLastSchema,
  phone: validatePhoneSchema,
  country: validateCountrySchema,
  city: validateCitySchema,
  street: validateStreetSchema,
  houseNumber: validateHouseNumberSchema,
  zip: validateZipSchema,
};

export { validateSchema };
