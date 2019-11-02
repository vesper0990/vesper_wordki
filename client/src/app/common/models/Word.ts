export class Word {
  id: string = '';
  groupId: string = '';
  language1: string = '';
  language1Example: string = '';
  language2: string = '';
  language2Example: string = '';
  drawer: number = 0;
  isVisible: boolean = true;
  repeatingCounter: number = 0;

  increaseDrawer() {
    this.drawer++;
    if (this.drawer > 4) {
      this.drawer = 4;
    }
  }

  resetDrawer(): void {
    this.drawer = 0;
  }

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }

  clone(): Word {
    let word = new Word();
    word.id = this.id;
    word.groupId = this.groupId;
    word.drawer = this.drawer;
    word.language1 = this.language1;
    word.language1Example = this.language1Example;
    word.language2 = this.language2;
    word.language2Example = this.language2Example;
    word.isVisible = this.isVisible;
    word.repeatingCounter = this.repeatingCounter;
    return word;
  }
}