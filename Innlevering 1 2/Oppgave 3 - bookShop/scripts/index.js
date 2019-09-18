
let shoppingCartSection = new Vue({
    el: "#shoppingCart-section",
    data: {
        itemCounter: 0,
        shoppingCartList: [],
        total: 0,
        message: "Betal nå",
    },
    methods: {
        addNewItem() {
            console.log(shoppingCartList)
        },
        checkout() {
            if (shoppingCartSection.shoppingCartList.length === 0) {
                alert("Ingenting å bestille!")
            } else {
                alert("Takk for bestillingen!")
                shoppingCartSection.total = 0;
                shoppingCartSection.shoppingCartList = [];
                shoppingCartCounter.itemCounter = 0;
            }
        }
    }
}) 


//Inneholdet til handlekurven
Vue.component("items", {
    props: ["productImage", "productName", "inventory", "price", ],
    template: `
    <article class='item'>
      <img class="item-image" :src="productImage">
      <h3 class="item-name">{{productName}}</h3>
      <p class="item-price">{{price}} kr</p>
      <button class="remove-item" v-on:click="$emit(\'remove\')" @click="removeFromshoppingCart"><i class="fas fa-trash"></i></button>
    </article>
    `,
    methods: {
        removeFromshoppingCart() {
            for (let i = 0; i < vue.productData.length; i++) {
                if (this.productName !== vue.productData[i].productName) {
                    console.log("ikke like")
                } else {
                    console.log(vue.productData[i])
                    vue.productData[i].inventory += 1
                    shoppingCartCounter.itemCounter -= 1;
                    shoppingCartSection.total -= this.price
                }
            }
        }
    }
});

//Inneholdet til bøkene
Vue.component("products", {
    props: ["productImage", "productName", "description", "inventory", "price", "counter"],
    template: `
    <article class='product'>
      <img class="product-image" :src="productImage">
      <h3>{{productName}}</h3>
      <p>{{description}}</p>
      <p>{{counter}}</p>
      <p>I lager: {{inventory}}</p>
      <p class="prodprice"> {{price}} kr</p>
      <button class="buy-button" @click='addToshoppingCart'>Legg til handlekurv</button>
    </article>
    `,
    methods: {
        addToshoppingCart: function () {
            for (let i = 0; i < vue.productData.length; i++) {
                if (this.productName !== vue.productData[i].productName) {
                    console.log("ikke like")
                } else if (this.inventory == 0) {
                    alert("There is no more prodcts left")
                } else {
                    const {
                        productImage,
                        productName,
                        description,
                        inventory,
                        price
                    } = this;
                    shoppingCartSection.shoppingCartList.push({
                        productImage,
                        productName,
                        description,
                        inventory,
                        price
                    })
                    vue.productData[i].inventory -= 1;
                    shoppingCartSection.itemCounter += 1;
                    shoppingCartSection.total += this.price;

                }
            }
        },
    }
});

//databasen til bøkene, her skriver jeg inn hva inneholdet til bøkene
let vue = new Vue({
    el: "#product-section",
    data: {
        productData: [{
                id: 1,
                productImage: "images/gameofthrones.jpg",
                productName: "Game of Thrones",
                description: "In the mythical continent of Westeros, several powerful families fight for control of the Seven Kingdoms. As conflict erupts in the kingdoms of men, an ancient enemy rises once again to threaten them all. Meanwhile, the last heirs of a recently usurped dynasty plot to take back their homeland from across the Narrow Sea.",
                inventory: 1900,
                price: 12000,
                category: "electronics"
            },
            {
                id: 1,
                productImage: "images/harrypotter.jpg",
                productName: "Harry Potter",
                description: "An orphaned boy enrolls in a school of wizardry, where he learns the truth about himself, his family and the terrible evil that haunts the magical world.",
                inventory: 120,
                price: 1200,
                category: "electronics"
            },
            {
                id: 1,
                productImage: "images/hungergames.jpg",
                productName: "Hunger Games",
                description: "Based on the book by Suzanne Collins, Katniss Everdeen takes her sister's place in the Hunger Games, a fight to the death in live TV. One boy and one girl are chosen randomly from each district to participate. Winning means fame and fortune. Losing means certain death",
                inventory: 7,
                price: 9800,
                category: "books"
            },
            {
                id: 1,
                productImage: "images/mebeforeyou.jpg",
                productName: "Me before You",
                description: "Louisa Clark is a small town girl who knows a lot about the people around her. Will is a quadriplegic man who hates everyone around him. Louisa is hired by Will's mum to take care of him for six months. Although they have a rocky start, their relationship grows over time, going for hate, to like, to love.",
                inventory: 56,
                price: 4300,
                category: "books"
            },
            {
                productImage: "images/snomannen.jpg",
                productName: "Snømannen",
                description: "When an elite crime squad's lead detective investigates the disappearance of a victim on the first snow of winter, he fears an elusive serial killer may be active again. With the help of a brilliant recruit, the cop must connect decades-old cold cases to the brutal new one if he hopes to outwit this unthinkable evil before the next snowfall.",
                inventory: 5,
                price: 120000,
                category: "games"
            }
        ],
    },

    events: {
        "checkoutRequest": function () {
            vue.$broadcast("checkoutRequest");
        }
    }
});