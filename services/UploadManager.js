import * as ImagePicker from "expo-image-picker";
export default class UploadManager {
    static async getBlobFromUri(uri) {
        const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
                resolve(xhr.response);
            };
            xhr.onerror = function (e) {
                reject(new TypeError("Network request failed"));
            };
            xhr.responseType = "blob";
            xhr.open("GET", uri, true);
            xhr.send(null);
        });
        return blob;
    }
    static async manageFileUpload(imgURI, fileName, folderName, onComplete) {

    }
    /**
     * 
     * @param {String[]} images 
     * @param {String } folderName 
     * @param {String } baseName 
     * @returns 
     */
    static uploadMany(images, folderName, baseName, index, urls, done) {
        if (index == images.length) {
            done(urls)
            return
        }
        UploadManager.manageFileUpload(images[index], `${baseName}${index}`, folderName, (uri) => {
            urls.push(uri)
            UploadManager.uploadMany(images, folderName, baseName, index + 1, urls, done)
        })
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

        return imgURI;
    }

}


