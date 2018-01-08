import {Sommet} from './Sommet'

/**
 *
 * @author Benrkia ilyasse
 * @author El Adssaoui Achraf
 * Filiere GLSID 1; 2017
 */

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