export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

interface IItemUpdater {
  update(): void;
}

abstract class ItemUpdater implements IItemUpdater {
  public constructor(protected item: Item) {}

  public abstract update(): void;

  protected abstract getSellInUpdateRate(): number;
  protected abstract getQualityUpdateRate(): number;

  protected basicUpdateQuality() {
    const newQuality = this.item.quality + this.getQualityUpdateRate();
    if (newQuality > 50) {
      this.item.quality = 50;
    } else if (newQuality < 0) {
      this.item.quality = 0;
    } else {
      this.item.quality = newQuality;
    }
  }

  protected basicUpdateSellIn() {
    this.item.sellIn += this.getSellInUpdateRate();
  }
}

class RegularItemUpdater extends ItemUpdater {
  public update(): void {
    this.basicUpdateSellIn();
    this.basicUpdateQuality();
  }

  public getQualityUpdateRate(): number {
    if (this.item.sellIn > 0) {
      return -1;
    }

    return -2;
  }

  public getSellInUpdateRate(): number {
    return -1;
  }
}

// this class makes me unhappy,
// leaving it as is due to task timing constraints (1.5h)
class ConjuredItemUpdater extends RegularItemUpdater {
  public update(): void {
    this.basicUpdateSellIn();
    this.basicUpdateQuality();
  }

  public getQualityUpdateRate(): number {
    return 2 * super.getQualityUpdateRate();
  }

  public getSellInUpdateRate(): number {
    return super.getQualityUpdateRate();
  }
}

class LegendaryItemUpdater extends ItemUpdater {
  public update(): void {
    return;
  }

  public getQualityUpdateRate(): number {
    return 0;
  }

  public getSellInUpdateRate(): number {
    return 0;
  }
}

class AgedItemUpdater extends ItemUpdater {
  public update(): void {
    this.basicUpdateSellIn();
    this.basicUpdateQuality();
  }

  public getQualityUpdateRate(): number {
    return +1;
  }

  public getSellInUpdateRate(): number {
    return -1;
  }
}

class BackstagePassItemUpdater extends ItemUpdater {
  public update(): void {
    this.basicUpdateSellIn();
    this.basicUpdateQuality();
  }

  public getQualityUpdateRate(): number {
    if (this.item.sellIn <= 0) {
      // resulting quality should be set to zero;
      return 0 - this.item.quality;
    }

    if (this.item.sellIn < 6) {
      return 3;
    }

    if (this.item.sellIn < 11) {
      return 2;
    }

    return 1;
  }

  public getSellInUpdateRate(): number {
    return -1;
  }
}

class ItemUpdaterFactory {
  public static create(item: Item): IItemUpdater {
    if (item.name.match("Sulfuras")) {
      return new LegendaryItemUpdater(item);
    }

    if (item.name.match("Backstage passes")) {
      return new BackstagePassItemUpdater(item);
    }

    if (item.name.match("Aged Brie")) {
      return new AgedItemUpdater(item);
    }

    if (item.name.match("Conjured")) {
      return new ConjuredItemUpdater(item);
    }

    return new RegularItemUpdater(item);
  }
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = []) {
    this.items = items;
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      const itemUpdater = ItemUpdaterFactory.create(this.items[i]);
      itemUpdater.update();
    }

    return this.items;
  }
}
