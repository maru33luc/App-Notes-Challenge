import { Injectable, signal } from '@angular/core';
import { Category } from '../interfaces/Category';
import { environments } from '../../environments/environments';
import { BehaviorSubject } from 'rxjs';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  categoryUrl = environments.urlBackCategories;
  categories = signal<Category[]>([]);

  constructor() {
    this.getCategories().then((categories) => {
      if (categories) {
        this.categories.set(categories);
      }
    });
  }

  async getCategoryName(id: number | undefined): Promise<string | undefined> {
    try{
      const res = await fetch(`${this.categoryUrl}/${id}`);
      const data = await res.json();
      return data.nombre;
    }catch(err){
      console.log(err);
    }
    return undefined;
  }

  async getCategories () : Promise<Category[]> {
    try{
      const res = await fetch(`${this.categoryUrl}`);
      const data = await res.json();

      return data;
    }catch(err){
      console.log(err);
    }
    return [];
  }

  async deleteCategory(id: number | undefined) {
    try{
      const res = await fetch(`${this.categoryUrl}/${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      this.categories?.set(await this.getCategories());
      return data;
    }catch(err){
      console.log(err);
    }
    return undefined;
  }

  async createCategory(category: Category) {
    try{
      const res = await fetch(`${this.categoryUrl}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(category)
      });
      const data = await res.json();
      if(data.id){
        const categories = await this.getCategories();
        this.categories.set(categories);
        return data;
      }
      return undefined;
    }catch(err){
      console.log(err);
    }
    return undefined;
  }

  async getCategoryById(id: number | undefined) {
    try{
      const res = await fetch(`${this.categoryUrl}/${id}`);
      const data = await res.json();
      return data;
    }catch(err){
      console.log(err);
    }
    return undefined;
  }

  async updateCategory(category: Category, id: number | undefined) {
    try{
      const res = await fetch(`${this.categoryUrl}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(category)
      });
      const data = await res.json();
      this.categories?.set(await this.getCategories());
      return data;
    }catch(err){
      console.log(err);
    }
    return undefined;
  }
}
