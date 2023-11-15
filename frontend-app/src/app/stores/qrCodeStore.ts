import { makeObservable, observable, action } from 'mobx';

export default class QRCodeStore {
  numberOfCodes = 0;
  tableNumber = 0;

  constructor() {
    makeObservable(this, {
      numberOfCodes: observable,
      tableNumber: observable,
      generateQRCodeDataArray: action,
      generateBase64QRCode: action,
      handleAddQRCode: action,
      handleRemoveQRCode: action,
    });
  }

  generateQRCodeDataArray = (count: any) => {
    return Array.from({ length: count }, (_, i) => ({
      id: i + 1,
      url: `${window.location.origin}/`, // Removed the table number from the URL
    }));
  };

  generateBase64QRCode = (_text: any) => {
    const base64ImagePlaceholder = 'base64-encoded-image-data';
    return base64ImagePlaceholder;
  };

  handleAddQRCode = () => {
    this.numberOfCodes += 1;
  };

  handleRemoveQRCode = () => {
    if (this.numberOfCodes > 0) {
      this.numberOfCodes -= 1;
    }
  };


}




