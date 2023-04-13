const downloadFiles = (urls: string) => {
    const file = urls.split('/');
    const fileName = file[file.length - 1];
  
    const link = document.createElement('a');
    link.href = urls;
    // link.target = '_blank';
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    link?.parentNode?.removeChild(link);
  };
  
  export default downloadFiles;