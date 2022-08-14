import { reactive, ref, watch } from "vue"
import Fuse from 'fuse.js'
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

export default defineNuxtPlugin(nuxtApp => {
  const rootDirectoryId = "root"
  const trashDirectoryId = "trash"
  const cryptoStore = useNuxtApp().$crypto

  //@ts-ignore
  const templateNewVault: IVaultFile = Object.freeze({
    //id: cryptoStore.getUUID(),
    password: "",
    directories: {
      [rootDirectoryId]: {
        id: rootDirectoryId,
        name: rootDirectoryId,
        keys: [],
        subdirectories: [
          "1"
        ],
        last_modified: new Date()
      },
      [trashDirectoryId]: {
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
  })

  const vaults = ref([] as IVaultFile[])
  const currentVaultId = ref("")

  // VAULT FILE SECTION BEGIN
  const createVault = async (vault?: IVaultFile): Promise<IVaultFile> => {
    return {
      id: vault?.id || cryptoStore.getUUID(),
      directories: vault?.directories || [
        createDirectory({ id: "root" }),
        createDirectory({ id: "trash" })
      ],
      keys: vault?.keys || [],
      fileHandle: vault?.fileHandle || undefined,
      password: vault?.password || ""
    }
  }

  const getVault = (vaultId: string = rootDirectoryId): IVaultFile => {
    const vault = vaults.value.find(vault => vault.id === vaultId)
    if (typeof vault !== "object")
      throw new Error(`Konnte Vault ID ${vaultId} nicht finden`)
    else
      return vault
  }

  const setCurrentVault = (vaultId: string) => {
    if (getVault(vaultId))
      currentVaultId.value = vaultId
  }

  const saveVault = async (vaultId: string = currentVaultId.value): Promise<boolean> => {
    try {
      console.log("saveVault")
      const vault = getVault(vaultId)
      if (!vault)
        return false

      const fileHandle = vault.fileHandle
      const password = vault.password || ""
      const data = JSON.stringify(vault)

      if (!fileHandle)
        return false

      return cryptoStore.saveFileEncrypted(data, fileHandle, password)

    } catch (error) {
      console.log("Error while writing file", error)
      return false
    }
  }

  const addVault = async (newVault: IVaultFile): Promise<boolean> => {
    if (!newVault.id || !newVault.fileHandle)
      return false

    try {
      const vault = getVault(newVault.id)
      await updateVault(newVault)
    } catch (error) {
      vaults.value.push(await createVault(newVault))
    }
    return true

  }

  const updateVault = async (newVault: IVaultFile): Promise<boolean> => {
    const index = vaults.value.findIndex(vault => vault.id === newVault.id)

    if (index < 0)
      return false

    const updateVault = await createVault(newVault)
    vaults.value.splice(index, 1, updateVault)
    return true
  }

  const syncVault = (vault: IVaultFile, vaultId: string = currentVaultId.value) => {
    try {
      console.log("syncVault nothing implemented yet")
      return true
    } catch (error) {

    }
  }
  // VAULT FILE SECTION END


  // DIRECTORY SECTION BEGIN
  const createDirectory = ({ id, name, keys, subdirectories, last_modified }: { id?: string, name?: string, keys?: string[], subdirectories?: string[], last_modified?: Date }): IVaultDirectory => {
    return {
      id: id || cryptoStore.getUUID(),
      name: name || "",
      keys: keys || [],
      subdirectories: subdirectories || [],
      last_modified: last_modified || new Date()
    }
  }

  const getDirectory = (
    directoryId: string = rootDirectoryId,
    vaultId: string = currentVaultId.value
  ): IVaultDirectory => {
    const vault = getVault(vaultId)

    const directory = vault.directories.find(directory => directory.id === directoryId)

    if (typeof directory !== "object")
      throw new Error(`Konnte Directory ${directoryId} nicht finden`)
    return directory
  }

  const addDirectory = (
    directory: IVaultDirectory,
    parentDirectoryId: string = rootDirectoryId,
    vaultId: string = currentVaultId.value,
  ): boolean => {
    try {
      //console.log("addDirectory", directory, vaultId)
      const vault = getVault(vaultId)

      if (!vault && !getDirectory(directory.id))
        return false

      const newDirectory = createDirectory(directory)

      if (!newDirectory)
        return false

      const parentDirectory = getDirectory(parentDirectoryId) || getDirectory(rootDirectoryId)

      //console.log("parentDirectory", parentDirectory)

      if (typeof parentDirectory === "object" && parentDirectory?.id) {
        parentDirectory.subdirectories = [...parentDirectory.subdirectories, directory.id]
        return true
      }
      return false
    } catch (error) {
      console.log("ERROR vault-store addDirectory ", error)
      return false
    }
  }

  const updateDirectory = (
    directory: IVaultDirectory,
    vaultId: string = currentVaultId.value
  ): boolean => {
    try {
      const vault = getVault(vaultId)

      const oldDirectory = getDirectory(directory.id, vaultId)

      if (typeof oldDirectory === "object") {
        oldDirectory.keys = directory.keys
        oldDirectory.last_modified = new Date()
        oldDirectory.name = directory.name
        oldDirectory.subdirectories = directory.subdirectories

        return true
      }
      return false
    } catch (error) {
      console.log("ERROR updateDirectory", error)
      return false
    }
  }

  const deleteDirectory = (
    directoryId: string,
    vaultId: string = currentVaultId.value
  ): boolean => {
    try {
      const vault = getVault(vaultId)
      const index = vaults.value.findIndex(vault => vault.id === vaultId)

      // never delete the rootDirectory or the trash directory
      if (directoryId === rootDirectoryId || directoryId === trashDirectoryId || !vault || index < 0)
        return false

      // delete all keys from directory
      const directory = getDirectory(directoryId, vaultId)

      if (typeof directory !== "object")
        return false

      directory
        .keys
        .forEach(
          keyId => deleteKey(keyId, vaultId)
        )

      // delete all subdirectories and their keys and subdirectories
      directory
        .subdirectories
        .forEach(
          subDirectoryId => deleteDirectory(subDirectoryId)
        )

      const directoryIds = Object.keys(vault.directories)

      // delete all references in other directories
      vault.directories.forEach(directory => {
        directory.subdirectories = directory.subdirectories
          .filter(
            subDirectoryId => subDirectoryId !== directoryId
          )
      })

      // finally delete the directory
      vault.directories.splice(index, 1)

      return true
    } catch (error) {
      console.log("ERROR deleteDirectory", error)
      return false
    }
  }
  // DIRECTORY SECTION END


  // KEY SECTION BEGIN
  const createKey = async (key?: IVaultKey, options?: ICreateKeyOptions): Promise<IVaultKey> => {
    return {
      id: options?.forceNewId ? await cryptoStore.getUUID() : key?.id || await cryptoStore.getUUID(),
      attributes: key?.attributes || [],
      description: key?.description || "",
      history: options?.noHistory ? [] : key?.history || [],
      last_modified: key?.last_modified || new Date(),
      password: key?.password || "",
      title: key?.title || "",
      urls: key?.urls || [],
      username: key?.username || "",
    }
  }

  const addKey = async (
    key: IVaultKey,
    parentDirectoryId: string = rootDirectoryId,
    vaultId: string = currentVaultId.value
  ): Promise<boolean> => {
    try {
      const vault = getVault(vaultId)

      if (!vault)
        return false

      const newKey = await createKey(key)

      vault.keys.push(newKey)

      const parentDirectory = getDirectory(parentDirectoryId, vaultId) || getDirectory(rootDirectoryId, vaultId)

      if (typeof parentDirectory === "object") {
        parentDirectory.keys = [...parentDirectory.keys, newKey.id]
        return true
      }

      return false
    } catch (error) {
      console.log("ERROR addKey", error)
      return false
    }
  }

  const getKey = (
    keyId: string,
    vaultId: string = currentVaultId.value,
    deepCopy: boolean = false
  ): IVaultKey | false => {
    const vault = getVault(vaultId)

    if (!vault)
      return false

    const key = getKey(keyId, vaultId)

    if (deepCopy) {
      return JSON.parse(JSON.stringify(key))
    } else
      return key
  }

  const updateKey = async (
    key: IVaultKey,
    vaultId: string = currentVaultId.value
  ): Promise<boolean> => {
    try {
      const vault = getVault(vaultId)

      if (!vault)
        throw new Error(`Keine gültige vaultId ${vaultId}`)

      const oldKey = getKey(key.id, vaultId, true)

      if (!oldKey || !oldKey.id)
        throw new Error(`Konnte Schlüssel ${key.id} nicht finden`)

      if (JSON.stringify(oldKey) === JSON.stringify(key))
        return true

      oldKey.history = []
      key.history = [...key.history, oldKey]
      key.last_modified = new Date()

      vault.keys.push(await createKey(key))

      return true
    } catch (error) {
      console.log("ERROR updateDirectory", error)
      return false
    }
  }

  const isKeyInTrash = (
    keyId: string,
    vaultId: string = currentVaultId.value
  ): boolean => {
    try {
      const vault = getVault(vaultId)
      const trash = getDirectory("trash", vaultId)

      if (typeof trash === "object")
        return trash?.keys?.includes(keyId)
      return false
    } catch (error) {
      console.log("ERROR isKeyInTrash", error)
      return false
    }
  }

  const deleteKeyReference = (
    keyId: string,
    vaultId: string = currentVaultId.value,
    deleteInTrash: boolean = false
  ): boolean => {

    const vault = getVault(vaultId)

    vault.directories.
      filter(directory => !(
        directory.id === trashDirectoryId
        && deleteInTrash === false)
      )
      .forEach(directory => {
        directory.keys = directory.keys.filter(
          subKeyId => subKeyId !== keyId
        )
      })

    return true
  }

  const moveKeyToTrash = (
    keyId: string,
    vaultId: string = currentVaultId.value
  ): boolean => {
    const vault = getVault(vaultId)

    deleteKeyReference(keyId, vaultId)

    const trashDirectory = getDirectory(trashDirectoryId, vaultId)
    trashDirectory.keys.push(keyId)
    return true
  }

  const deleteKey = (
    keyId: string,
    vaultId: string = currentVaultId.value
  ): boolean => {
    try {
      console.log("deleteKey", keyId, vaultId)
      const vault = getVault(vaultId)


      if (isKeyInTrash(keyId, vaultId)) {
        deleteKeyReference(keyId, vaultId, true)
        const index = vault.keys.findIndex(key => key.id === keyId)
        vault.keys.splice(index, 1)
        return true
      }
      else
        return moveKeyToTrash(keyId, vaultId)
    } catch (error) {
      return false
    }
  }

  const searchKey = (search: string, vaultId: string = currentVaultId.value) => {
    const options: Fuse.IFuseOptions<IVaultKey> = { keys: ["title", "description", "username",], minMatchCharLength: 1 }

    const vault = getVault(vaultId)

    const fuse = new Fuse(vault.keys, options)

    return fuse.search(search).map(searchResult => searchResult.item)
  }
  // KEY SECTION END

  return {
    provide: {
      addDirectory,
      addKey,
      addVault,
      createDirectory,
      createKey,
      createVault,
      currentVaultId: skipHydrate(currentVaultId),
      deleteDirectory,
      deleteKey,
      getDirectory,
      getKey,
      getVault,
      rootDirectoryId: skipHydrate(rootDirectoryId),
      saveVault,
      searchKey,
      setCurrentVault,
      syncVault,
      templateNewVault: skipHydrate(templateNewVault),
      trashDirectoryId: skipHydrate(trashDirectoryId),
      updateDirectory,
      updateKey,
      updateVault,
      vaults: skipHydrate(vaults)
    }
  }
})