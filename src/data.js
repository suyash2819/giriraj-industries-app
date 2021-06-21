export const data = {
  collections: {
    men: [
      {
        key: 1,
        itemType: "Lower",
        Description: "cotton , color red, washable...",
        Cost: "250 rs",
        btnText: "Add To Cart",
        image: "https://picsum.photos/200/300?q=$(Math.random())",
      },
      {
        key: 2,
        itemType: "Tshirt",
        Description: "Lenin , color white, washable...",
        Cost: "899 rs",
        btnText: "Add To Cart",
        image: "https://picsum.photos/200/300?q=$(Math.random())",
      },
    ],
    women: [
      {
        key: 3,
        itemType: "Lower",
        Description: "cotton , color red, washable...",
        Cost: "250 rs",
        btnText: "Add To Cart",
        image: "https://picsum.photos/200/300?q=$(Math.random())",
      },
      {
        key: 4,
        itemType: "Top",
        Description: "Lenin , color white, washable...",
        Cost: "899 rs",
        btnText: "Add To Cart",
        image: "https://picsum.photos/200/300?q=$(Math.random())",
      },
    ],
    kids: [
      {
        key: 5,
        itemType: "Lower",
        Description: "cotton , color red, washable...",
        Cost: "250 rs",
        btnText: "Add To Cart",
        image: "https://picsum.photos/200/300?q=$(Math.random())",
      },
      {
        key: 6,
        itemType: "Tshirt",
        Description: "Lenin , color white, washable...",
        Cost: "899 rs",
        btnText: "Add To Cart",
        image: "https://picsum.photos/200/300?q=$(Math.random())",
      },
    ],
    covid: [
      {
        key: 7,
        itemType: "Lower",
        Description: "cotton , color red, washable...",
        Cost: "250 rs",
        btnText: "Add To Cart",
        image: "https://picsum.photos/200/300?q=$(Math.random())",
      },
      {
        key: 8,
        itemType: "Tshirt",
        Description: "Lenin , color white, washable...",
        Cost: "899 rs",
        btnText: "Add To Cart",
        image: "https://picsum.photos/200/300?q=$(Math.random())",
      },
    ],
  },
};

export const sections = {
  men: "Men",
  women: "Women",
  kids: "Kids",
  covid: "Covid",
};

export const logo =
  "https://firebasestorage.googleapis.com/v0/b/giriraj-industries.appspot.com/o/images%2Fgiriraj-industries-logo.png?alt=media&token=c84f3229-c1ef-44e4-9779-a029625254b2";

export const createOrderUrl =
  // "http://localhost:9000/createOrder";
  "https://6n55wu9sxj.execute-api.us-east-1.amazonaws.com/dev/createOrder";

export const generateHashUrl =
  // "http://localhost:9000/generateHash";
  "https://6n55wu9sxj.execute-api.us-east-1.amazonaws.com/dev/generateHash";
