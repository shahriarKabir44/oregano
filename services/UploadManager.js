import * as ImagePicker from "expo-image-picker";
import Global from "./Globals";
import * as FileSystem from 'expo-file-system'
export default class UploadManager {
    static async getBlobFromURI(uri) {
        return await FileSystem.readAsStringAsync(uri, { encoding: 'base64' });
    }

    static async uploadImage(URI, additionalData, apiURL) {
        let blob = await UploadManager.getBlobFromURI(URI)
        let formData = new FormData()
        formData.append("file", blob)
        fetch(Global.SERVER_URL + apiURL, {
            method: 'POST',
            body: formData,
            headers: {
                'Content-type': 'multipart/form-data',

                ...additionalData
            }
        }).then(res => res.json())
            .catch(err => {
                console.log(err)
            })

    }
    /**
     * 
     * @param {String[]} images 
     * @param {String } folderName 
     * @returns 
     */
    static async uploadMany(images, folderName, API_URL) {
        let urls = []
        console.log(API_URL)
        let promises = []
        let imageIndex = 0;
        for (let imageURI of images) {
            let additionalData = {
                uploadpath: folderName,
                imagename: "image-" + imageIndex++
            }

            urls.push(folderName + '/' + additionalData.imagename + '.jpg')
            promises.push(UploadManager.uploadImage(imageURI, additionalData, API_URL))
        }
        await Promise.all(promises);
        return urls;

    }
    static async uploadImageFromDevice() {
        let imgURI = null;

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            imgURI = result.uri;
        }
        console.log(result)
        return imgURI;
    }

    static async uploadList(apiURL, path) {
        let uploadedURLs = []
        let promises = []
        for (let n = 0; n < imageURIs.length; n++) {
            promises.push(UploadManager.uploadImage(imageURIs[n], {
                path: path + n,
                filename: imageURIs[n]
            }, apiURL).then(({ url }) => {
                uploadedURLs.push(url)
            }))
        }
        await Promise.all(promises)
        return uploadedURLs
    }

}


