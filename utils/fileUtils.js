import _get from 'lodash/get'

/**
 *
 * @param {Blob} file
 * @returns {Promise<*>}
 */
export const readAsDataURLAsync = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    // eslint-disable-next-line no-unused-vars
    reader.onload = () => {
      resolve(reader.result)
    }

    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

/**
 *
 * @param {{}} file
 * @param {Event} e
 * @returns {Promise<*>}
 */
const validateImageFile = (file, e) => {
  return new Promise((resolve, reject) => {
    if (!/\.(jpg|jpeg|png)$/i.test(file.name)) {
      e.target.value = null
      // eslint-disable-next-line prefer-promise-reject-errors
      reject('onlyImage')
    } else {
      resolve()
    }
  })
}

/**
 *
 * @param {Event} e
 * @returns {Promise<{dataUrl: string, file}|{dataUrl: null, file: null}>}
 */
export const imageFileUpload = async (e) => {
  const file = _get(e, 'target.files[0]', null)
  if (file) {
    await validateImageFile(file, e)
    const dataUrl = await readAsDataURLAsync(file)
    return { file, dataUrl }
  } else {
    // eslint-disable-next-line no-throw-literal
    throw 'uploadFailed'
  }
}

/**
 *
 * @param {Event} e
 * @returns {*[]}
 */
export const multiImageUpload = (e) => {
  const result = []
  const files = _get(e, 'target.files', null)

  Array.from(files).forEach(async (file) => {
    if (file) {
      await validateImageFile(file, e)
      const dataUrl = await readAsDataURLAsync(file)
      result.push({ file, dataUrl })
    }
  })

  return result
}

/**
 *
 * @param {Event} e
 * @returns {Promise<{dataUrl: string, file}|{dataUrl: null, file: null}>}
 */
export const fileUpload = async (e) => {
  const file = _get(e, 'target.files[0]', null)
  if (file) {
    const dataUrl = await readAsDataURLAsync(file)
    return { file, dataUrl }
  }

  return { file: null, dataUrl: null }
}

/**
 *
 * @param { string } responseData
 * @param { string } fileName
 */
export const downloadFile = (responseData, fileName = '') => {
  const url = window.URL.createObjectURL(new Blob([responseData.data]))
  const link = document.createElement('a')
  if (!fileName) {
    fileName = 'unknown'
    const contentDisposition = responseData.headers['content-disposition']
    if (contentDisposition) {
      const [fileNameMatch] = contentDisposition.split(';').filter(str => str.includes('filename'))
      if (fileNameMatch) { [, fileName] = fileNameMatch.split('=') }
    }
  }
  link.href = url
  link.setAttribute('download', fileName)
  link.style.cssText = 'display:none'
  document.body.appendChild(link)
  link.click()
  link.remove()
}
