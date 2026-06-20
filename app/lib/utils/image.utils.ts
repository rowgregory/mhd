export async function convertToWebP(file: File, maxSizeMB = 1): Promise<File> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    const url = URL.createObjectURL(file)

    img.onload = () => {
      URL.revokeObjectURL(url)

      const canvas = document.createElement('canvas')
      canvas.width = img.width
      canvas.height = img.height

      const ctx = canvas.getContext('2d')
      if (!ctx) return reject(new Error('Canvas context unavailable'))
      ctx.drawImage(img, 0, 0)

      // Try quality levels until under maxSizeMB
      const maxBytes = maxSizeMB * 1024 * 1024
      const quality = 0.85

      function tryQuality(q: number) {
        canvas.toBlob(
          (blob) => {
            if (!blob) return reject(new Error('Conversion failed'))

            if (blob.size <= maxBytes || q <= 0.1) {
              const webpFile = new File([blob], file.name.replace(/\.[^.]+$/, '.webp'), { type: 'image/webp' })
              resolve(webpFile)
            } else {
              tryQuality(Math.max(q - 0.1, 0.1))
            }
          },
          'image/webp',
          q
        )
      }

      tryQuality(quality)
    }

    img.onerror = () => reject(new Error('Failed to load image'))
    img.src = url
  })
}
