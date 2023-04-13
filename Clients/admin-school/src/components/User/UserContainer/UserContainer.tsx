import { inject, observer } from 'mobx-react';
import { FC, useState } from 'react';
import { UserStoreInterface } from '../../../store/UserStore';
import { AbstractEmptyInterface } from '../../../types';
import { IUser } from '../../../common/interface/userInterface';
import User, { UserValidationError } from './User';

interface UserContainerProps extends AbstractEmptyInterface {
  userStore: UserStoreInterface;
}

const UserContainer: FC<AbstractEmptyInterface> = props => {
  const { userStore } = props as UserContainerProps;
  const [validationError, setValidationError] = useState<UserValidationError>({});
  const { user: currentUser } = userStore;

  const saveUser = (user: IUser & { newPassword?: string; confirmPassword?: string }) => {
    if (isValid(user)) {
      userStore.updateUserInfo(user);
    }
  };

  const isValid = (user: IUser & { newPassword?: string; confirmPassword?: string }): boolean => {
    const checkError: UserValidationError = {};
    if (!user.firstName.trim()) {
      checkError.firstName = 'Vous devez ajouter un nom';
    }
    if (!user.username.trim()) {
      checkError.username = "Vous devez ajouter un nom d'utilisateur";
    }
    if (!user.email.trim()) {
      checkError.email = 'Vous devez ajouter un email';
    } else if (!user.email.match(/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/)) {
      checkError.email = "Cet email n'est pas correct";
    }

    if (user.newPassword?.trim()) {
      if (user.newPassword.length < 8) {
        checkError.newPassword = 'Entrez 8 caractères minimum';
      }
      if (!user.confirmPassword?.trim()) {
        checkError.confirmPassword = 'Veuillez confirmer le nouveau mot de passe';
      } else if (user.newPassword !== user.confirmPassword) {
        checkError.confirmPassword = 'Le mot de passe de confirmation ne correspond pas';
      }
      if (!user.password.trim()) {
        checkError.password =
          'Pour changer de mot de passe, vous devez entrer votre mot de passe actuel';
      }
    } else if (userStore.user?.email !== user.email && !user.password.trim()) {
      checkError.password = "Pour changer d'email, vous devez entrer votre mot de passe actuel";
    }

    setValidationError(checkError);
    return Object.keys(checkError).length === 0;
  };

  return <User user={currentUser} handleSave={saveUser} validationError={validationError} />;
};

export default inject('userStore')(observer(UserContainer));
