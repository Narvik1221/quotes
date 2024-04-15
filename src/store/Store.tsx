import { makeAutoObservable } from "mobx";

export default class Store {
  _quotes: any;
  _likes:any
  constructor() {
    this._quotes = [];
    this._likes =  JSON.parse(localStorage.getItem('likes')|| '{}');
    makeAutoObservable(this);
  }

  setQuotes(quotes: any) {
    this._quotes = quotes;
  }
  setLikes(likes: any) {
    this._likes = likes;
    localStorage.setItem('likes',JSON.stringify(this._likes))
  }
  get quotes() {
    return this._quotes;
  }
  get likes() {
    return this._likes;
  }
}
