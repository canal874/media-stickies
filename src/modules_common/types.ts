/** 
 * @license MediaSticky
 * Copyright (c) Hidekazu Kubota
 *
 * This source code is licensed under the Mozilla Public License Version 2.0
 * found in the LICENSE file in the root directory of this source tree.
 */

'use strict';

export type Rectangle = {
  x: number,
  y: number,
  width: number,
  height: number
};
export type CardBase = {
  id: string,
  data: string
};
export type CardStyle = {
  titleColor: string,
  backgroundColor: string,
  backgroundOpacity: number
};
// Properties of a card that must be serialized
// Each of them must have unique name to be able to use as a key when serialize.
export type CardPropSerializable = CardBase & Rectangle & CardStyle;

export class CardProp implements CardBase {
  constructor(
    public id: string,
    public data: string = '',
    public rect: Rectangle = { x: 70, y: 70, width: 260, height: 176 },
    public style: CardStyle = { titleColor: '#d0d090', backgroundColor: '#ffffa0', backgroundOpacity: 1.0 }
  ) { }

  public serialize = (): CardPropSerializable => {
    return {
      id: this.id,
      data: this.data,
      x: this.rect.x,
      y: this.rect.y,
      width: this.rect.width,
      height: this.rect.height,
      titleColor: this.style.titleColor,   
      backgroundColor: this.style.backgroundColor,
      backgroundOpacity: this.style.backgroundOpacity,
    }
  };

  public static deserialize = (json: CardPropSerializable): CardProp => {
    return new CardProp(json.id, json.data,
      { x: json.x, y: json.y, width: json.width, height: json.height },
      { titleColor: json.titleColor, backgroundColor: json.backgroundColor, backgroundOpacity: json.backgroundOpacity })
  }
};


export interface ICardIO {
  generateNewCardId(): string;
  getCardIdList(): Promise<Array<string>>;
  readCardData(id: string): Promise<CardProp>;
  writeOrCreateCardData(prop: CardProp): Promise<string>;
  deleteCardData(id: string): Promise<string>;
};

export interface ICardEditor {
  resizedByCode: boolean;
  isEditorReady: boolean;
  readonly hasCodeMode: boolean;
  startEditMode(): void;
  endEditMode(): void;
  toggleCodeMode(): void;
  startCodeMode(): void;
  endCodeMode(): void;
  setSize(width: number, height: number): void;
}
