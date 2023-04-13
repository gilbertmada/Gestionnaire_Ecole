import rootStore from '../store/AppStore';
import authServices from './AuthServices';

/**
 * To check the error returned by axios and display the correct message to the user
 * if the user token is expired, it will automatically log the user out
 * @param error of type Error
 * @param control of type string or object
 * @param errorDuration of type number (milliseconds)
 */
export const parseError = (
  error: any,
  control?: string | { [key: number]: string },
  errorDuration?: number
) => {
  if (error.message.includes('status code 423')) {
    // Expired token
    rootStore.updateSnackBar(true, 'Votre session a expiré!');
    authServices.signOut();
    window.location.reload();
  }
  if (typeof control !== 'string') {
    if (control) {
      const index: string | undefined = Object.keys(control).find(key =>
        error.message.includes(`status code ${key}`)
      );

      if (index) {
        rootStore.updateSnackBar(true, control[parseInt(index, 10)], 'error', errorDuration);
        
      }
    }
    // rootStore.updateSnackBar(
    //   true,
    //   "Une erreur s'est produite. Veuillez réessayer plus tard!",
    //   'error',
    //   errorDuration
    // );
    // return;
  }
  // rootStore.updateSnackBar(
  //   true,
  //   control  || "Une erreur s'est produite. Veuillez réessayer plus tard!",
  //   'error',
  //   errorDuration
  // );
};
