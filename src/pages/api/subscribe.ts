//SEÇÃO CHECKOUT
import { NextApiRequest, NextApiResponse } from "next";
//RESPONSAVEL POR FAZER A VALIDAÇÃO DO METODO DE REQUISIÇÃO
import { getSession } from "next-auth/client";
import {stripe} from "../../services/stripe";

export default async (req: NextApiRequest, res: NextApiResponse)=>{
  
  //VERIFICA SE O METODO É DO TIPO POST
  if( req.method === 'POST'){
    //ATRAVÉS DO METODO getSession CONSEGUIMOS PEGAR OS DADOS DO USUARIO AUTENTICADO
    const session = await getSession({req});

    //CRIANDO CLIENTE NO STRIPE USANDO O EMAL OBTIDO NA SESSÃO //FALTA A VALIDAÇÃO PARA O USUARIO NÃO CRIAR MAIS DE UMA CONTA
    const stripeCustomer = await stripe.customers.create({
      email: session.user.email,
    })

    //SEÇÃO DE CHECKOUT
    const stripeCheckoutSession = await stripe.checkout.sessions.create({
      //ESTAMOS CRIANDO O CLIENTE NO PAINEL DO STRIPE
      customer: stripeCustomer.id,
      //METODO DE PAGAMENTO ACEITO
      payment_method_types:['card'],
      //ENDEREÇO DE COBRANÇA OBRIGATORIO
      billing_address_collection: 'required',
      //ITEMS DA COPRA SENDO PREÇO E QUANTIDADE
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