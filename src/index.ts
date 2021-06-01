import { getDistance, parseCoffeeShops, createPosition } from "./util";
import path from "path";

const [userXString, userYString, csvLocation] = process.argv.slice(2);
if (!userXString || !userYString || !csvLocation)
  throw new Error("Invalid input");

const userPosition = createPosition(userXString, userYString);
const coffeeShops = parseCoffeeShops(path.resolve(process.cwd(), csvLocation));

coffeeShops
  .map((coffeeShop) => {
    const distanceToUser = getDistance(userPosition, coffeeShop.position);
    return { distanceToUser, coffeeShop };
  })
  .sort((a, b) => a.distanceToUser - b.distanceToUser)
  .forEach(({ coffeeShop, distanceToUser }) => {
    console.log(`${coffeeShop.name}, ${distanceToUser.toFixed(4)}`);
  });
