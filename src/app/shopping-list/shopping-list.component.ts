import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../../../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css',
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[];
  private ingredientsSub: Subscription;

  constructor(private shoppingListService: ShoppingListService) {}
  ngOnInit() {
    this.ingredients = this.shoppingListService.getShoppingList();
    this.ingredientsSub = this.shoppingListService.ingredientsChanged.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      }
    );
  }

  onEditItem(index: number) {
    this.shoppingListService.startedEditing.next(index);
  }

  ngOnDestroy() {
    this.ingredientsSub.unsubscribe();
  }
}
