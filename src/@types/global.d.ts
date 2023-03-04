import { Axios } from 'axios';
import { NavigateFunction } from 'react-router-dom';

declare global {
  interface Window {
    axios: Axios;
    navigate: NavigateFunction;
    $t: TFunction<'translation', undefined, 'translation'>;
    $dispatch: Dispatch<AnyAction>;
  }
}
