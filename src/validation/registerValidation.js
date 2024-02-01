import Joi from "joi";
import { validateEmailLogin, validatePasswordLogin } from "./loginValidation";

const firstSchema = Joi.object({
  first: Joi.string().min(2).max(256).required(),
});

const middleSchema = Joi.object({
  middle: Joi.string().min(2).max(256).allow(""),
});

const lastSchema = Joi.object({
  last: Joi.string().min(2).max(256).required(),
});

const phoneSchema = Joi.object({
  phone: Joi.string()
    .pattern(/0[0-9]{1,2}?\s?[0-9]{3}\s?[0-9]{4}/)
    .required()
    .min(9)
    .max(11)
    .messages({
      "string.pattern.base": "must use a valid Phone Number",
    }),
});

const urlSchema = Joi.object({
  url: Joi.string()
    .uri({ scheme: ["http", "https"] })
    .required(),
});

const altSchema = Joi.object({
  alt: Joi.string().min(2).max(256).allow(""),
});

const stateSchema = Joi.object({
  state: Joi.string().min(2).max(256),
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
  houseNumber: Joi.number().min(1).max(256).integer().required(),
});

const zipSchema = Joi.object({
  zip: Joi.number().min(10000).max(99999999).integer().required(),
});

const isBusinessSchema = Joi.object({
  zip: Joi.bool().required(),
});

const validateFirstSchema = (first) => firstSchema.validate(first);
const validateMiddleSchema = (middle) => middleSchema.validate(middle);
const validateLastSchema = (last) => lastSchema.validate(last);
const validatePhoneSchema = (phone) => phoneSchema.validate(phone);
const validateUrlSchema = (url) => urlSchema.validate(url);
const validateAltSchema = (alt) => altSchema.validate(alt);
const validateStateSchema = (state) => stateSchema.validate(state);
const validateCountrySchema = (country) => countrySchema.validate(country);
const validateCitySchema = (city) => citySchema.validate(city);
const validateStreetSchema = (street) => streetSchema.validate(street);
const validateHouseNumberSchema = (houseNumber) =>
  houseNumberSchema.validate(houseNumber);
const validateZipSchema = (zip) => zipSchema.validate(zip);
const validateIsBusinessSchema = (isBusiness) =>
  isBusinessSchema.validate(isBusiness);

const validateSchema = {
  first: validateFirstSchema,
  middle: validateMiddleSchema,
  email: validateEmailLogin,
  password: validatePasswordLogin,
  last: validateLastSchema,
  phone: validatePhoneSchema,
  url: validateUrlSchema,
  alt: validateAltSchema,
  state: validateStateSchema,
  country: validateCountrySchema,
  city: validateCitySchema,
  street: validateStreetSchema,
  houseNumber: validateHouseNumberSchema,
  zip: validateZipSchema,
  isBusiness: validateIsBusinessSchema,
};

export { validateSchema };
