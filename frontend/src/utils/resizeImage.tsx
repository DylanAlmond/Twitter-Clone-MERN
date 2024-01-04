export const resizeImage = (file: File): Promise<File> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = (event) => {
      const img = new Image();
      
      if (typeof event.target?.result !== 'string') {
        return reject(new Error('Failed to create image'));
      }

      img.src = event.target.result;

      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        if (!ctx) {
          return reject(new Error('Canvas context unavailable'));
        }

        const width = 128;
        const height = 128;

        // Calculate the aspect ratio of the original image
        const aspectRatio = img.width / img.height;

        let newWidth = width;
        let newHeight = height;

        // Scale the image to fit the width and overflow on the y-axis
        newHeight = width / aspectRatio;

        canvas.width = width;
        canvas.height = height;

        // Draw the image, allowing y-axis overflow
        ctx.drawImage(img, 0, 0, newWidth, newHeight);

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error('Failed to create a blob'));
              return;
            }

            const resizedFile = new File([blob], file.name, {
              type: 'image/jpeg', // Set the desired file type
              lastModified: Date.now(),
            });
            
            resolve(resizedFile);
          },
          'image/jpeg', // Set the desired image format
          0.9 // Set the image quality (1 is maximum)
        );
      };

      img.onerror = (error) => {
        reject(error);
      };
    };

    reader.onerror = (error) => {
      reject(error);
    };
  });
};
