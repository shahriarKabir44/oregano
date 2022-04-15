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
                profileImageURL: "https://graph.facebook.com/656455615445264/picture?type=large"

            },
            expoPushToken: "abcd1234",

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
        name: "Nusrat Jahan Urme",
        Id: "1",
        facebookToken: {
            profileImageURL: "https://graph.facebook.com/656455615445264/picture?type=large"

        },
        expoPushToken: "poop",

    },
    price: 450,
    ratedBy: 5,
    rating: 4.5,
    relatedPosts: [
        {
            postedOn: (new Date()) * 1,
            images: ["https://upload.wikimedia.org/wikipedia/commons/0/04/Pound_layer_cake.jpg", "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YmlydGhkYXklMjBjYWtlc3xlbnwwfHwwfHw%3D&w=1000&q=80"],
            Id: "123"
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