import { NextApiRequest, NextApiResponse } from "next";
//RESPONSAVEL POR FAZER A VALIDAÇÃO DO METODO DE REQUISIÇÃO
import { getSession } from "next-auth/client";
import {stripe} from "../../services/stripe";

export default async (req: NextApiRequest, res: NextApiResponse)=>{
  
  if( req.method === 'POST'){
    //ATRAVÉS DO METODO getSession CONSEGUIMOS PEGAR OS DADOS DO USUARIO
    const session = await getSession({req});

    const stripeCustomer = await stripe.customers.create({
      email: session.user.email,
      //metadata
    })

    const stripeCheckoutSession = await stripe.checkout.sessions.create({
      
      //ESTAMOS CRIANDO O CLIENTE NO PAINEL DO STRIPE
      customer: stripeCustomer.id,

      payment_method_types:['card'],
      billing_address_collection: 'required',
      line_items: [
        {price: 'price_1PFigAHB51pYKCNhTkQyopn0', quantity: 1}
      ],
      mode: 'subscription',
      allow_promotion_codes: true,
      success_url: process.env.STRIPE_SUCCESS_URL,
      cancel_url: process.env.STRIPE_CANCEL_URL
    })
    return res.status(200).json({sessionId: stripeCheckoutSession.id})
  } else {

    res.setHeader("Allow", "POST")
    res.status(405).end("Method not Allowed")

  }
}