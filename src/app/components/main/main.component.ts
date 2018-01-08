/**
 *
 * @author Benrkia ilyasse
 * @author El Adssaoui Achraf
 * Filiere GLSID 1; 2017
 */
import { Component, OnInit, ViewChild } from '@angular/core';
import { Arc } from './Arc';
import { Sommet } from './Sommet';
import { drawGraph } from './drawGraph';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

	@ViewChild('Arcs') myArcs;

	isError=false;
	isSuccess=false;
	_Msg='';
	_dist='';

	_firstStep=true;
	_secondStep=false;
	_thirdStep=false;
	Noeuds=null;
	arcCount=2;

	constructor() {
		//new drawGraph();
	}
	ngOnInit(){}

	firstStep(Noeuds){
		this.Noeuds = Noeuds.split(",");
		if(this.Noeuds.length<3){
			this.isError = true;
		}else{
			this.isError = false;
			this._firstStep=false;
			this._secondStep=true;
			for(let Noeud of this.Noeuds){
				if(Noeud.length<2){
					this.isError = true;
					this._firstStep=true;
					this._secondStep=false;
					break;
				}
			}
		}
		
		this._Msg='vous devez entrez au moins 3 noeuds, au moins deux char pour chaque noeud';
	}

	dummy : Sommet;
	_mySommets = new Array<Sommet>();
	_myArcs = new Array<Arc>();

	secondStep(source){
		let _myLinks = new Array<Links>();
		this.dummy = new Sommet("Source");
		let i=0;
		for(let Noeud of this.Noeuds){
			this._mySommets[i] = new Sommet(Noeud);
			++i;
		}
		i=0;
		for(let child of this.myArcs.nativeElement.children){
			this._myArcs[i] = new Arc(this._mySommets[child.children[0].value], this._mySommets[child.children[4].value], parseInt(child.children[2].value))
			_myLinks[i]={source:this._mySommets[child.children[0].value].getLabel(),target:this._mySommets[child.children[4].value].getLabel(),type:"licensing",distance:parseInt(child.children[2].value),id:"p"+i};
			++i;
		}
		this._mySommets[source].setFrom(this.dummy);
		this._thirdStep=true;
		this.isError=false;
		this.isSuccess=false;
		new drawGraph(_myLinks);
	}

	getArcCount(){
		let test = new Array();
		for(let i=0;i<this.arcCount;++i){
			test[i] = i;
		}
		return test;
	}

	trouverChemain(myV){

		let s:Sommet = null;
        let value:string = myV;
                    
        s = this._mySommets[myV];

    	while (true) {

        	let cont:boolean = false
        	for (let _Arc of this._myArcs) {

            	let src:Sommet  = _Arc.getSrcSommet();
            	let dst:Sommet = _Arc.getDstSommet();
            	if (src.getFrom() == null) continue;

                if (dst.getFrom() == null ||
                	src.getTotalvaluation() + _Arc.getvaluation() < dst.getTotalvaluation()) {
                	dst.setFrom(src);
                	dst.setTotalvaluation(src.getTotalvaluation() + _Arc.getvaluation());
                	cont = true;
            	}
        	}
            if (!cont) break;

    	}

    	let _sommet:Sommet = s;
        let arr:string = "Le plus court chemin est : ";   

        let i=0;
		let chemin:Array<string> = new Array<string>();
    	while (_sommet != this.dummy && typeof _sommet!=='undefined') {
        	chemin[i++] = _sommet.getLabel();
         	_sommet = _sommet.getFrom();
    	}

    	if(typeof _sommet=='undefined'){
    		this._Msg = "pas de chemin a cette noeud";
    		this.isError = true;
    		this.isSuccess = false;
    	}else{
    		this._Msg = "";
	    	this._dist=s.getTotalvaluation()+"";
	    	for(--i;i>=0;i--){
	    		if(i>0)
	    			this._Msg=this._Msg+" "+chemin[i] + " => ";
                else
                	this._Msg = this._Msg + " "+chemin[i] ;
	    	}
    		this.isError = false;
    		this.isSuccess = true;
    	}


	}

}

interface Links{
	source:string,
    target: string,
    type: string,
    distance:number,
    id:string
}
