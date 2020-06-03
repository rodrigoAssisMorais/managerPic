import { Pipe, PipeTransform } from '@angular/core';
import { Photo } from '../photo/photo';

@Pipe(
    {
        name: 'filterByDescription'
    }
)
export class FilterByDescription implements PipeTransform {
    transform(photos: Photo[], _descriptionQuery: string) {
        _descriptionQuery = _descriptionQuery
            .trim()
            .toLowerCase();

        if(_descriptionQuery) {
            return photos.filter(photo => 
                photo.description.toLowerCase().includes(_descriptionQuery)
            );
        } else {
            return photos;
        }        
    }

}
