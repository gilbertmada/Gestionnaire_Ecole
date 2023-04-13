import { IUser, User } from "../entity/User";

const getUser = async (id: string) => {

  const userFinding = await User.findById(id);

  return userFinding as IUser;
};

export default getUser;
