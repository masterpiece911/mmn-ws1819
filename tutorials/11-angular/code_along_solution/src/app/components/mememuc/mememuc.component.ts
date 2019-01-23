import { Component, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Meme {
  name: string;
  link: string;
}

const MEME_API_BASE_URL = 'http://flobe-online.de:3002';

@Component({
  selector: 'mmn-mememuc',
  templateUrl: './mememuc.component.html',
  styleUrls: [ './mememuc.component.css' ],
})
export class MemeMUCComponent {

  public memeOptions: Meme[] = [
    {
      name: 'doge',
      link: `${MEME_API_BASE_URL}/memes/doge`,
    },
  ];

  public selectedBaseImage: Meme = null;

  public caption = {
    top: {
      text: '',
      x: 0,
      y: 0,
    },
    bottom: {
      text: '',
      x: 0,
      y: 0,
    },
  };


  public selectBaseImage (meme: Meme) {
    this.selectedBaseImage = meme;
  }

  public get memeUrl (): URL {
    if (this.selectedBaseImage) {
      const url = new URL(this.selectedBaseImage.link);

      url.searchParams.append('text', this.caption.top.text);
      url.searchParams.append('x', this.caption.top.x.toString());
      url.searchParams.append('y', this.caption.top.y.toString());
      url.searchParams.append('text2', this.caption.bottom.text);
      url.searchParams.append('x2', this.caption.bottom.x.toString());
      url.searchParams.append('y2', this.caption.bottom.y.toString());

      return url;
    } else {
      return null;
    }
  }
}
