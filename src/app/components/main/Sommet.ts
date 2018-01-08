/**
 *
 * @author Benrkia ilyasse
 * url: fb.com/benilya
 * @author El Adssaoui Achraf
 */

 export class Sommet {
    private label:string;
    private totalvaluation:number=0;
    private from:Sommet=null;

    constructor(label:string, from?:Sommet) {
      this.label = label;
      this.from = from;
    }

    public getLabel():string { 
        return this.label; 
    }
    public getFrom():Sommet { 
        return this.from; 
    }
    public getTotalvaluation():number {
        return this.totalvaluation; 
    }
    public setFrom(from:Sommet):void { 
        this.from = from; 
    }
    public setTotalvaluation(totalvaluation:number):void { 
        this.totalvaluation = totalvaluation; 
    }
    
}