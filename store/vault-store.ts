import { reactive, ref, watch } from "vue"

import { defineStore, skipHydrate } from 'pinia'

export interface IFileSystemFileHandle extends FileSystemFileHandle { }

export interface IKeyValue {
  [key: string]: any
}

export interface IVaultKeyAttribute {
  [key: string]: string | number
}

export interface IVaultDirectory {
  readonly id: string
  name: string
  keys: string[]
  subdirectories: string[]
  last_modified: Date
}

export interface IVaultDirectoryDB {
  [id: string]: IVaultDirectory,
  root: IVaultDirectory,
  trash: IVaultDirectory
}

export interface IVaultKey {
  readonly id: string,
  title: string
  description: string
  username: string
  password: string
  urls: Array<IVaultKeyUrl>
  attributes: Array<IKeyValue>
  history: Array<IVaultKey>
  last_modified: Date
}

export interface IVaultKeyUrl {
  url: string,
  open_command: string,
}

export interface ICreateKeyOptions {
  noHistory?: boolean
  forceNewId?: boolean
}

export interface IVaultFile {
  directories: IVaultDirectory[],
  fileHandle?: FileSystemFileHandle,
  readonly id: string,
  keys: IVaultKey[]
  password?: string,
}

export interface IVaultDB {
  [id: string]: IVaultFile
}

export interface IVaultStore {
  vaults: IVaultDB
  currentVaultId: string
}


export const useVaultStore = defineStore("vaultStore", () => {
  const rootDirectoryId = "root"
  const trashDirectoryId = "trash"
  const { cryptoStore } = useNuxtApp()

  /*   const templateNewVault: IVaultFile = Object.freeze({
      //id: cryptoStore.getUUID(),
      password: "",
      directories: {
        root: {
          id: rootDirectoryId,
          name: rootDirectoryId,
          keys: [],
          subdirectories: [
            "1"
          ],
          last_modified: new Date()
        },
        trash: {
          id: trashDirectoryId,
          name: trashDirectoryId,
          keys: [],
          subdirectories: [],
          last_modified: new Date()
        },
        "1": {
          id: "1",
          name: "Internet",
          keys: ["3"],
          subdirectories: ["2"],
          last_modified: new Date()
        },
  
        "2": {
          id: "2",
          name: "E-Mails",
          keys: ["4"],
          subdirectories: [],
          last_modified: new Date()
        }
      },
      keys: {
        "3": {
          id: "3",
          title: "demo key",
          password: "demo password",
          last_modified: new Date(),
          attributes: [],
          description: "",
          history: [],
          urls: [],
          username: "demo user"
        },
        "4": {
          id: "4",
          title: "test key",
          password: "test password",
          last_modified: new Date(),
          attributes: [],
          description: "",
          history: [],
          urls: [],
          username: "test user"
        }
      },
    }) */

  const vaults = ref([] as IVaultFile[])
  const currentVaultId = ref("")

  // VAULT FILE SECTION BEGIN

  const getVault = (vaultId = currentVaultId.value) => {
    return vaults.value.find(vault => vault.id === vaultId)
  }

  const setCurrentVault = (vaultId = rootDirectoryId) => {
    if (getVault(vaultId))
      currentVaultId.value = vaultId
  }

  const saveVault = async (vaultId: string = currentVaultId.value): Promise<boolean> => {
    try {
      console.log("saveVault")
      const vault = getVault(vaultId)

      if (!vault)
        throw new Error(`Vault mit ID ${vaultId} wurde nicht gefunden`)


      const fileHandle = vault.fileHandle
      const password = vault.password || ""
      const data = JSON.stringify(vault)

      if (!fileHandle)
        throw new Error("Datei zum Speichern nicht verfügbar")

      return cryptoStore.saveEncryptFile(data, fileHandle, password)

    } catch (error) {
      console.log("Error while writing file", error)
      return false
    }
  }

  return {
    currentVaultId: skipHydrate(currentVaultId),
    rootDirectoryId: rootDirectoryId,
    //templateNewVault: skipHydrate(templateNewVault),
    trashDirectoryId: trashDirectoryId,
    vaults: skipHydrate(vaults)
  }
})