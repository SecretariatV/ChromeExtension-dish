export interface dishStructure {
  id: number;
  name: string;
  level: string;
  method: string;
  seafood: string;
  produce_1: string;
  produce_2: string;
  spices_1: string;
  spices_2: string;
  oil: string;
  weight: string;
  serves: number;
  authenticity: string;
  stock: string;
}

export const data: dishStructure[] = [
  {
    id: 0,
    name: "Spanish Paella",
    level: "Medium",
    method:
      "Spanish paella is a traditional rice dish that originated in the Valencia region of Spain. It was originally made with ingredients such as saffron, rabbit, and snails, which were common in the area.",
    seafood: "Jumbo Shrimp",
    produce_1: "Onion",
    produce_2: "Tomatoes",
    spices_1: "Bay Left",
    spices_2: "Saffron",
    oil: "Spanish Olive Oil",
    weight: "700g",
    serves: 4,
    authenticity: "Unverified",
    stock: "Chicken",
  },
  {
    id: 1,
    name: "Patatas Bravas",
    level: "Easy",
    method:
      "Lower to a simmer and cook for 10 mins until pulpy. Can be kept chilled for up to 24 hrs. STEP 2.",
    seafood: "Jumbo Shrimp",
    produce_1: "Onion",
    produce_2: "Tomato",
    spices_1: "Bay Left",
    spices_2: "Saffron",
    oil: "Spanish Olive Oil",
    weight: "400g",
    serves: 5,
    authenticity: "Unverified",
    stock: "Potato",
  },
  {
    id: 2,
    name: "Gazpacho",
    level: "Medium",
    method:
      "Combine tomatoes, pepper, cucumber, onion and garlic in a blender or, if using a hand blender, in a deep bowl. (If necessary, work in batches.) ",
    seafood: "Jumbo Shrimp",
    produce_1: "Onion",
    produce_2: "Tomato",
    spices_1: "Bay Left",
    spices_2: "Saffron",
    oil: "Spanish Olive Oil",
    weight: "600g",
    serves: 5,
    authenticity: "Unverified",
    stock: "Potato",
  },
];
