import { BurgerActions } from "../../action/builderBurger";
import { IngredientActions } from "../../action/burgerIngredients";
import { OrderActions } from "../../action/order";
import { UserActions } from "../../action/user";

export type AppActions = 
  | UserActions
  | BurgerActions
  | OrderActions
  | IngredientActions 
