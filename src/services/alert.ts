import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export enum ETypeAlert {
  SUCCESS = 'success',
  ERROR = 'error',
  WARN = 'warn',
  INFOR = 'infor'
}

export const showAlert = (message: string, type: string = ETypeAlert.INFOR): void => {
  switch (type) {
    case ETypeAlert.SUCCESS:
      toast.success(message, { position: toast.POSITION.TOP_RIGHT });
      return;
    case ETypeAlert.ERROR:
      toast.success(message, { position: toast.POSITION.TOP_RIGHT });
      return;
    case ETypeAlert.WARN:
      toast.success(message, { position: toast.POSITION.TOP_RIGHT });
      return;
    case ETypeAlert.INFOR:
      toast.success(message, { position: toast.POSITION.TOP_RIGHT });
  }
};
