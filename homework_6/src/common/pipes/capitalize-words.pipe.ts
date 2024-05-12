import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class CapitalizeWordsPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if(metadata.type === 'body') {
      Object.keys(value).forEach(key => {
        if(typeof value[key] === 'string') {
          value[key] = value[key]
                      .split(' ')
                      .filter(word => word !== '') // If there is more than one blank space between the words, the word array will contain '' elements, and there will be error (can't find word[0].toUpperCase())
                      .map(word => { 
                        /* 
                        Since the types of the keys that contain UUID are also considered as string, and the UUID might start with a letter(a-f), we don't want that first letter to be capitalized 
                        UUIDs always have 36 characters
                        Given that it's very unlikely that any of the other keys (in any of the modules) will contain a word with 36 characters, we could make this condition to exclude the keys with UUID values from transformation  
                        */                   
                        if(word.length !== 36) return word[0].toUpperCase() + word.slice(1);
                        return word;                        
                      })
                      .join(' ');
        }
      })
    }
    return value;
  }
}
