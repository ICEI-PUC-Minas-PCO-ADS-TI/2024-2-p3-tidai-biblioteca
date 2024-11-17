import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const mostrarSucesso = (mensagem) => toast.success(mensagem);
export const mostrarErro = (mensagem) => toast.error(mensagem);

const ToastNotification = () => {
  return (
    <ToastContainer
    position="top-right"    // Posiciona no canto superior direito
    autoClose={5000}        // Fecha após 5 segundos
    hideProgressBar={false} // Mostra a barra de progresso
    newestOnTop={true}      // Coloca o popup mais recente no topo
    closeOnClick            // Fecha ao clicar no popup
    rtl={false}             // Texto da esquerda para a direita
    pauseOnFocusLoss        // Pausa ao perder o foco
    draggable               // Popup arrastável
    pauseOnHover            // Pausa quando o mouse está sobre ele
    />
  );
};

export default ToastNotification;