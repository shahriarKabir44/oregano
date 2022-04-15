const results = [
    {
        itemName: "Cake",
        rating: "3.5",
        price: 400,
        ratedBy: 5,
        vendor: {
            name: "Kuddus",
            Id: "1",
            facebookToken: {
                profileImageURL: "https://media.istockphoto.com/photos/asian-businesswoman-standing-smiling-at-the-camera-picture-id1335295926?b=1&k=20&m=1335295926&s=170667a&w=0&h=6TEcLiO3JwNG3VL2O1LLWGdFgUulikOMqG1cAGixf-E="

            },
            expoPushToken: "poop",

        },
        getLastPost: {

            lastPost: {
                images: ["https://upload.wikimedia.org/wikipedia/commons/0/04/Pound_layer_cake.jpg"]
            }
        }
    }
]

const searchResultDetails = {
    itemName: "Cake",
    lowerCasedName: "cake",
    maxAvailable: 5,
    vendor: {
        name: "Kuddus",
        Id: "1",
        facebookToken: {
            profileImageURL: "https://media.istockphoto.com/photos/asian-businesswoman-standing-smiling-at-the-camera-picture-id1335295926?b=1&k=20&m=1335295926&s=170667a&w=0&h=6TEcLiO3JwNG3VL2O1LLWGdFgUulikOMqG1cAGixf-E="

        },
        expoPushToken: "poop",

    },
    price: 450,
    ratedBy: 5,
    rating: 4.5,
    relatedPosts: [
        {
            postedOn: (new Date()) * 1,
            images: ["https://upload.wikimedia.org/wikipedia/commons/0/04/Pound_layer_cake.jpg", "https://upload.wikimedia.org/wikipedia/commons/0/04/Pound_layer_cake.jpg"],
            Id: "123"
        },
        {
            postedOn: (new Date()) * 1 - 3600 * 1000,
            images: ["https://upload.wikimedia.org/wikipedia/commons/0/04/Pound_layer_cake.jpg"],
            Id: "111"
        }
    ]

}

export default class SearchingServices {
    static async SearhcItems() {
        return results
    }
    static async getDetails(sellerId, itemName) {
        return searchResultDetails
    }
}