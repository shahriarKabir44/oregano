const results = [
    {
        itemName: "Cake",
        rating: "3.5",
        price: 400,
        ratedBy: 5,
        vendor: {
            name: "Kuddus",
            Id: 1,
            facebookToken: {
                profileImageURL: "https://media.istockphoto.com/photos/asian-businesswoman-standing-smiling-at-the-camera-picture-id1335295926?b=1&k=20&m=1335295926&s=170667a&w=0&h=6TEcLiO3JwNG3VL2O1LLWGdFgUulikOMqG1cAGixf-E="

            },
            expoPushToken: "poop",

        },
        product: {

            lastPost: {
                images: ["https://upload.wikimedia.org/wikipedia/commons/0/04/Pound_layer_cake.jpg"]
            }
        }
    }
]

export default class SearchingServices {
    static async SearhcItems() {
        return results
    }
}