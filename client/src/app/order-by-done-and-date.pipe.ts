import {Injectable,  Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'order'
})
@Injectable()
export class OrderByDoneAndDatePipe implements PipeTransform {
  transform(array: any[], args: string): any[] {
 
    array=["2014-12-23T18:04:41.000Z","2012-12-23T03:04:00.000Z","2014-12-23T13:04:00.000Z"] 
    array.sort((a: any, b: any) => {
	    if ( a[args] < b[args] ){
        console.log("aa");
	    	return -1;
	    }else if( a[args] > b[args] ){
        console.log("aa");
	        return 1;
	    }else{
        
	    	return 0;	
	    }
    });
    console.log(array);
    return array;
  }
}