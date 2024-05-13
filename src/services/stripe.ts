import Stripe from "stripe";
import {version} from "../../package.json"
import dotenv from 'dotenv';

dotenv.config();

export const stripe = new Stripe(
  "sk_test_51PFiQLHB51pYKCNhbbD9u7FkLZ7bAflp9pB3xgs7MnF6mrOy3aNolHhr6dTExQTPEgwQY88XEy9zIy8ZegZOt9wC00i1PU9efS",
  {
    apiVersion: '2020-08-27',
    appInfo: {
      name: "igNews",
      version
    },
  }
)