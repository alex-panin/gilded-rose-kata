import { expect } from "chai";
import { Item, GildedRose } from "../app/gilded-rose";

describe("Gilded Rose", function () {
  it("should correctly update once", function () {
    const initialData = [
      new Item("foo", 0, 0),
      new Item("Aged Brie foo", 10, 10),
      new Item("Backstage passes wow", 8, 10),
      new Item("Conjured frog", 10, 40),
      new Item("Conjured froggo", -2, 3),
      new Item("Sulfuras frog", 8, 80),
    ];

    const updatedDataMock = [
      { name: "foo", sellIn: -1, quality: 0 },
      { name: "Aged Brie foo", sellIn: 9, quality: 11 },
      { name: "Backstage passes wow", sellIn: 7, quality: 12 },
      { name: "Conjured frog", sellIn: 9, quality: 38 },
      { name: "Conjured froggo", sellIn: -3, quality: 0 },
      { name: "Sulfuras frog", sellIn: 8, quality: 80 },
    ];

    // just checking the dynamics;
    // for (let i = 0; i < 20; i++) {
    //   const gildedRose = new GildedRose(initialData);
    //   const items = gildedRose.updateQuality();
    //   console.log(items);
    // }

    const gildedRose = new GildedRose(initialData);
    const items = gildedRose.updateQuality();
    expect(items).to.deep.equal(updatedDataMock);
  });
});
