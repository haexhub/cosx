export interface IFileSystemFileHandle extends FileSystemFileHandle { }
import { IVaultFile } from "@/store/vault-store";
import { createPinia } from 'pinia'
import { PiniaPluginContext } from 'pinia'
import { Plugin } from 'nuxt/app'

const cryptoPiniaPlugin = (context: PiniaPluginContext) => {
  const checkBrowserCompatibility = (): boolean => {
    //@ts-ignore
    return window?.showSaveFilePicker && window.showOpenFilePicker
  }

  const base64ToBuffer = (base64: string) => {
    return Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));
    //return Buffer.from(base64, 'base64')
  }

  const bufferToBase64 = (buffer: Uint8Array) => {
    return btoa(String.fromCharCode.apply(null, [...buffer]))
    //return buffer.toString('base64')
  }

  const saveFileEncrypted = async (
    data: string,
    fileHandle: FileSystemFileHandle,
    password: string
  ): Promise<boolean> => {
    try {
      //console.log("encryptFile", fileHandle, password)

      if (typeof data !== "string")
        data = JSON.stringify(data)

      //@ts-ignore
      const writeStream = await fileHandle.createWritable()

      const encryptedData = await encrypt(data, password)

      await writeStream.write(
        encryptedData
      )

      await writeStream.close()
      return true
    } catch (error) {
      console.log("Error saveFileEncrypted", error)
      return false
    }
  }

  const encrypt = async (data: string, password: string): Promise<string | boolean> => {
    try {
      const salt = crypto.getRandomValues(new Uint8Array(16))

      const iv = crypto.getRandomValues
        (new Uint8Array(12))

      const key = await generateKey(password)

      const aesKey = await deriveKey(key, salt, ["encrypt"])

      const encryptedContent = await crypto.subtle.encrypt({
        name: 'AES-GCM',
        iv
      },
        aesKey,
        new TextEncoder().encode(data)
      )

      const encryptedContentArray = new Uint8Array(encryptedContent)

      const buffer = new Uint8Array(
        salt.byteLength + iv.byteLength + encryptedContentArray.byteLength
      )

      buffer.set(salt, 0)
      buffer.set(iv, salt.byteLength)
      buffer.set(encryptedContentArray, salt.byteLength + iv.byteLength)

      const base64 = bufferToBase64(buffer)

      return base64
    } catch (error) {
      console.log("ERROR during encryption", error)
      return false
    }
  }

  const decrypt = async (encyptedData: string, password: string = ""): Promise<string | false> => {
    try {
      const encryptedDataBuffer = base64ToBuffer(encyptedData)

      const salt = encryptedDataBuffer.slice(0, 16)

      const iv = encryptedDataBuffer.slice(16, 16 + 12)

      const data = encryptedDataBuffer.slice(16 + 12)

      const key = await generateKey(password)

      const aesKey = await deriveKey(key, salt, ["decrypt"])

      const decryptedContent = await crypto.subtle.decrypt({
        name: "AES-GCM",
        iv
      },
        aesKey,
        data
      )

      //console.log("decryptedContent", decryptedContent)
      const dec = new TextDecoder()
      return dec.decode(decryptedContent)

    } catch (error) {
      console.log("ERROR during decryption", error)
      return false
    }
  }

  const decryptVaultFileHandle = async (fileHandle: FileSystemFileHandle, password: string): Promise<IVaultFile | false> => {
    try {
      if (fileHandle.kind === 'file') {
        const file = await fileHandle.getFile()

        const encryptedData = await file.text()
        const decryptedData = await decrypt(encryptedData, password)

        if (!decryptedData)
          return false

        const data = JSON.parse(decryptedData) as IVaultFile

        data.fileHandle = fileHandle
        data.password = password

        if (data)
          return data

      }
      return false
    } catch (error) {
      console.log("ERROR decryptVaultDB ", error)
      return false
    }
  }

  const deriveKey = (key: CryptoKey, salt: Uint8Array, keyUsage: KeyUsage[]): Promise<CryptoKey> => {
    return crypto.subtle.deriveKey({
      name: "PBKDF2",
      salt,
      iterations: 250.000,
      hash: "SHA-256"
    },
      key,
      {
        name: "AES-GCM",
        length: 256
      },
      false,
      keyUsage
    )
  }

  const generateKey = (rawKey: string) => {
    const extractable = false

    return crypto.subtle.importKey(
      "raw",
      new TextEncoder().encode(rawKey),
      "PBKDF2",
      extractable,
      ["deriveKey"]
    )
  }

  const createVaultFile = async (): Promise<FileSystemFileHandle | false> => {
    try {
      //@ts-ignore
      const newVaultFileHandle = await window.showSaveFilePicker({
        suggestedName: "cosVault.cos",
        types: [{
          description: 'COS Vault',
          accept: {
            'application/plain': ['.cos']
          }
        }],
        multiple: false,
        id: 'cos'
      })

      return newVaultFileHandle || false
    } catch (error) {
      if (error instanceof Error) {
        console.log("error while creating new databse ", error)
      }
      return false
    }
  }

  const openVaultFile = async (): Promise<FileSystemFileHandle | false> => {
    try {
      //@ts-ignore
      const [vaultFileHandle] = await window.showOpenFilePicker({
        types: [{
          description: 'COS Vault',
          accept: {
            'application/plain': ['.cos']
          }
        }],
        multiple: false,
        id: 'cos'
      })
      return vaultFileHandle || false
    } catch (error) {
      console.log("ERROR getVaultFileHandle", error)
      return false
    }
  }

  const getUUID = async () => {
    if (process.client)
      return await window.crypto.randomUUID()
    else
      return await crypto.randomUUID()
  }

  return {
    provide: {
      checkBrowserCompatibility,
      createVaultFile,
      decryptVaultFileHandle,
      getUUID,
      openVaultFile,
      saveFileEncrypted,
    }
  }
}

const cryptoNuxtPlugin: Plugin = ({ $pinia }) => {
  $pinia.use(cryptoPiniaPlugin)
}


export default defineNuxtPlugin(cryptoNuxtPlugin)


