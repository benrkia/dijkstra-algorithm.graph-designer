/**
 *
 * @author Benrkia ilyasse
 * url: fb.com/benilya
 * @author El Adssaoui Achraf
 */
 import {Sommet} from './Sommet'

export class Arc {

  private srcSommet:Sommet;
  private dstSommet:Sommet;
  private valuation:number;

  public constructor(srcSommet:Sommet, dstSommet:Sommet, valuation:number) {
    this.srcSommet = srcSommet;
    this.dstSommet = dstSommet;
    this.valuation = valuation;
  }

  public getSrcSommet():Sommet { return this.srcSommet; }
  public getDstSommet():Sommet { return this.dstSommet; }
  public getvaluation():number { return this.valuation; }

}