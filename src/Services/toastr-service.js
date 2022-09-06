import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const configToast = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};


export const exibirMensagem = (msg, tipo) => {
    if ( tipo === 'success' ) {
      toast.success( msg , configToast);
    } else if ( tipo === 'error' ) {
      toast.error( msg , configToast);
    } else if ( tipo === 'warning' ) {
      toast.warning(msg, configToast);
    }
}