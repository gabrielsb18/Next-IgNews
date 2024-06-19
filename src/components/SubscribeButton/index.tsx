import { useSession, signIn } from "next-auth/client";
import styles from "./styles.module.scss";
import { api } from "../../services/api";
import { geStripeJs } from "../../services/stripe-js";

interface SubscribeButtonProps {
  priceId: string;
}

export function SubscribeButton ({priceId}: SubscribeButtonProps) {
  //modulo responsável por acessar a seção do usuario pelo nextAuth
  const [session] = useSession();
  
  //verifica se meu usuario está logado
  async function handleSubscribe(){
    if(!session){
      //redirecionamos para a autenticação
      signIn('github')
      return;
    }

    //AXIOS
    try{
      const response = await api.post('/subscribe');

      const {sessionId} = response.data;

      const stripe = await geStripeJs();

     await stripe.redirectToCheckout({sessionId});

    } catch (err){
      alert(err.message);
    }
  }

  return (
    <button
    type = "button"
    className = {styles.subscribeButton}
    onClick ={handleSubscribe}
    >
      Subscribe now
    </button>
  )
} 