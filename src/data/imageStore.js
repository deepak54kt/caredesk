const DB_NAME = 'caredesk-media'
const STORE_NAME = 'images'
const DB_VERSION = 1

function openDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION)
    request.onupgradeneeded = () => request.result.createObjectStore(STORE_NAME)
    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error || new Error('Unable to open image storage.'))
  })
}

export async function saveImage(file) {
  const database = await openDatabase()
  const key = `${Date.now()}-${crypto.randomUUID()}`
  await new Promise((resolve, reject) => {
    const request = database.transaction(STORE_NAME, 'readwrite').objectStore(STORE_NAME).put(file, key)
    request.onsuccess = resolve
    request.onerror = () => reject(request.error || new Error('Unable to save image.'))
  })
  database.close()
  return key
}

export async function readImage(key) {
  if (!key) return null
  const database = await openDatabase()
  const file = await new Promise((resolve, reject) => {
    const request = database.transaction(STORE_NAME, 'readonly').objectStore(STORE_NAME).get(key)
    request.onsuccess = () => resolve(request.result || null)
    request.onerror = () => reject(request.error || new Error('Unable to read image.'))
  })
  database.close()
  return file
}

export async function deleteImage(key) {
  if (!key) return
  const database = await openDatabase()
  await new Promise((resolve, reject) => {
    const request = database.transaction(STORE_NAME, 'readwrite').objectStore(STORE_NAME).delete(key)
    request.onsuccess = resolve
    request.onerror = () => reject(request.error || new Error('Unable to remove image.'))
  })
  database.close()
}
