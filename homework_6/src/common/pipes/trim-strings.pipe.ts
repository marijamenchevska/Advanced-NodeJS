import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class TrimStringsPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    // Do this if the argument you receive is a (request) body, which is an object
    if(metadata.type === 'body') {
      Object.keys(value).forEach( key => {
        if(typeof value[key] === 'string') value[key] = value[key].trim();
      })
    }
    
    return value;
  }
}
