import React, { useEffect } from "react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import styles from "./home.module.scss";
import { SubscribeButton } from "../components/SubscribeButton";
import {stripe} from "../services/stripe";

interface HomeProps {
  product: {
    priceId: string;
    amount: number;
  }
}

export default function Home({product}: HomeProps) {
  return (
    <>
      <Head>
        <title>Home ig.news</title>
      </Head>
      
      <main className= {styles.contentContainer}>
        <section className= {styles.hero}>
          <span>👋 Hey, welcome</span>
          <h1>New about the <span>React</span> world.</h1>
          <p>
            Get acess to all the publication<br />
            <span>for {product.amount} month</span>
          </p>
          <SubscribeButton priceId = {product.priceId}/>
        </section>

        <img src = "/Mulher.svg" alt = "Imagem Girl coding"/>
      </main>
    </>
  );
}

//PRODUCT
export const getServerSideProps: GetServerSideProps = async () => {
  const price = await stripe.prices.retrieve('price_1PFigAHB51pYKCNhTkQyopn0');

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('en-us', {
      style: "currency",
      currency: "USD",
    }).format(price.unit_amount / 100)
  };

  return {
    props: {
      product,
    },
  };
};