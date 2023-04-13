import axios from 'axios';
import { action, makeObservable, observable } from 'mobx';
import config from '../config';
import { parseError } from '../services/utils';

export interface UploadFileStoreInterface {
  uploadedFile: (fileDestination: string, formData: any) => Promise<any[] | []>;
  deleteFile: (pathName: string) => Promise<any[] | []>;
  progress: number;
  checked: boolean;
}

class UploadFileStore implements UploadFileStoreInterface {
  @observable progress = 0;

  @observable checked = false;

  constructor() {
    makeObservable(this);
  }

  @action uploadedFile = async (fileDestination: string, formData: any) => {
    try {
      const response = await axios.post(
        `${config.servers.apiUrl}uploadFile/upload/${fileDestination}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: data => {
            this.setProgress(0);
            this.setProgress(Math.round((100 * data.loaded) / data.total));
          },
        }
      );

      return response.data;
    } catch (err) {
      parseError(err, "Une erreur s'est produite. Veuillez réessayer plus tard!");
    } finally {
      this.setCheck(false);
    }
  };

  @action deleteFile = async (pathName: string) => {
    try {
      const response = await axios.post(`${config.servers.apiUrl}uploadFile/delete`, {
        path: pathName,
      });

      return response.data;
    } catch (err) {
      parseError(err, "Une erreur s'est produite. Veuillez réessayer plus tard!");
    } finally {
      this.setCheck(false);
    }
  };

  @action setCheck = (data: boolean) => {
    this.checked = data;
  };

  @action setProgress = (data: number) => {
    this.progress = data;
  };
}

export default new UploadFileStore();
