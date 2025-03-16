export const getBase64Image = (file: File) => new Promise((res) => {
  const reader = new FileReader();

  reader.onload = function (e) {
    const base64String = e.target?.result;
    res(base64String);
  };
  reader.readAsDataURL(file);
});
