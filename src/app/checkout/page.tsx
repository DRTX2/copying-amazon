import { Metadata } from 'next';
import CheckoutClient from './CheckoutClient';

export const metadata: Metadata = {
  title: 'Finalizar Compra | Amazon Clone',
  description: 'Completa tu pedido de forma segura.',
};

export default function CheckoutPage() {
  return <CheckoutClient />;
}
