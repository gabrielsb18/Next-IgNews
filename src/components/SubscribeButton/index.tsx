import { useSession, signIn } from "next-auth/client";
import styles from "./styles.module.scss";

interface SubscribeButtonProps {
  priceId: string;
}

export function SubscribeButton ({priceId}: SubscribeButtonProps) {
  //modulo responsável por acessar a seção do usuario pelo nextAuth
  const [session] = useSession();
  
  //verifica se meu usuario está logado
  function handleSubscribe(){
    if(!session){
      //redirecionamos para a autenticação
      signIn('github')
      return;
    }
    //criação da checkout session
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