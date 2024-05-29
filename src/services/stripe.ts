import Stripe from "stripe";
import dotenv from 'dotenv';

dotenv.config();

export const stripe = new Stripe(
  process.env.STRIPE_API_KEY,
  {
    apiVersion: '2020-08-27',
    appInfo: {
      name: "igNews",
      version: process.env.npm_package_version
    },
  }
)