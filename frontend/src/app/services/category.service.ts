import { Injectable } from '@angular/core';
import { Category } from '../interfaces/Category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor() { }

  async getCategoryName(id: number | undefined): Promise<string | undefined> {
    try{
      const res = await fetch(`http://localhost:3000/categories/${id}`);
      const data = await res.json();
      return data.nombre;
    }catch(err){
      console.log(err);
    }
    return undefined; 
  }

  async getCategories () : Promise<any[]> {
    try{
      const res = await fetch(`http://localhost:3000/categories`);
      const data = await res.json();
      return data;
    }catch(err){
      console.log(err);
    }
    return []; 
  }

  async deleteCategory(id: number | undefined) {
    try{
      const res = await fetch(`http://localhost:3000/categories/${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      return data;
    }catch(err){
      console.log(err);
    }
    return undefined; 
  }

  async createCategory(category: Category) {
    try{
      const res = await fetch(`http://localhost:3000/categories`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(category)
      });
      const data = await res.json();
      return data;
    }catch(err){
      console.log(err);
    }
    return undefined; 
  }

  async getCategoryById(id: number | undefined) {
    try{
      const res = await fetch(`http://localhost:3000/categories/${id}`);
      const data = await res.json();
      return data;
    }catch(err){
      console.log(err);
    }
    return undefined; 
  }

  async updateCategory(category: Category, id: number | undefined) {
    try{
      const res = await fetch(`http://localhost:3000/categories/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(category)
      });
      const data = await res.json();
      return data;
    }catch(err){
      console.log(err);
    }
    return undefined; 
  }
}
