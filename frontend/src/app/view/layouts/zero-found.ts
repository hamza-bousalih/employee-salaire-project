export class ZeroFound {
  private _notFoundEmoji= [
    '(⊙_⊙;)',
    ' \t(￣▽￣)ノ',
    ' \t\\(￣ﾊ￣)',
    ' \t|ʘ‿ʘ)╯',
    ' \t(－_－) zzZ',
    ' \t(/・・)ノ',
    '―(T_T)→',
    '( ͡• ͜ʖ ͡• )',
    '(ಠ_ಠ)'
  ];
  randomEmoji!: string;

  public notFoundEmoji() {
    let length = this._notFoundEmoji.length;
    let rand = Math.floor(Math.random()*length);
    this.randomEmoji = this._notFoundEmoji[rand];
  }
}
