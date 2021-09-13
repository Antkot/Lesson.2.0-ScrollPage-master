import { Pipe, PipeTransform } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Hashes } from '../types';
import { filter, first } from 'rxjs/operators';
import { stringify } from 'querystring';
import { TagsStorageService } from '../part-components/services/tags-storage.service';

@Pipe({
  name: 'tagNameById'
})
export class TagNameByIdPipe implements PipeTransform {
  data = null;
  // tags$: Observable<Array<Hashes>> = this.tagsService.tags$;
  //
  // constructor(private tagsService: TagsStorageService) {
  // }
  transform(value: string, tags$: Array<Hashes>): string {
    console.log('Otrzymano: ', value);

    tags$.forEach(tag => {
      console.log(tag.hashId === value, tag.hashId, '===', value);
      if (tag.hashId === value) {
        this.data = tag.name;
        console.log(3, this.data);
        return this.data;
      }
    });
    console.log('Zwrot: ', this.data);
    return this.data;
  }

}

//
// const translatedTag = tags$.next([
//   ...current
//   // ...current.filter(record => record.hashId !== value)
// ]);
//
// export class PrintPricePipe implements PipeTransform {
//   price$ = this.store.pipe(select(selectPrintPrices));
//   photoGroup$ = this.store.pipe(select(selectPhotoGroups));
//   photosList$ = this.store.pipe(select(selectPhotosList));
//
//   constructor(private store: Store<{ shoppingCart: ShoppingCartState }>) {}
//
//   transform(value: PrintInBasket) {
//     return this.price$.pipe(
//       map((prices) => ({
//         standardPrice: prices.find(
//           ({ printFormatId, printPaperId }) =>
//             printFormatId === value.printFormatId &&
//             printPaperId === value.printPaperId
//         )?.price,
//       })),
//       switchMap(({ standardPrice }) =>
//         this.photosList$.pipe(
//           map((photosList) => ({
//             standardPrice,
//             photoGroupId: photosList
//               .find(
//                 ({ photos }) =>
//                   photos.find(({ photoId }) => photoId === value.photoId)
//                     ?.photoGroupId
//               )
//               ?.photos.find(({ photoId }) => photoId === value.photoId)
//               ?.photoGroupId,
//           }))
//         )
//       ),
//       switchMap(({ standardPrice, photoGroupId }) =>
//         this.photoGroup$.pipe(
//           map((photoGroup) => ({
//             standardPrice,
//             groupPrice: photoGroup
//               .find((x) => x.photoGroupId === photoGroupId)
//               ?.config.prints?.find(
//                 ({ printPaperId, printFormatId }) =>
//                   printPaperId === value.printPaperId &&
//                   printFormatId === value.printFormatId
//               )?.price,
//           }))
//         )
//       ),
//       map(({ standardPrice, groupPrice }) => {
//         const finalPrice: Array<PriceConfig> = [];
//         if (groupPrice) {
//           groupPrice.forEach(({ price, code }) => {
//             finalPrice.push({ price: price * value.count, code });
//           });
//         } else {
//           standardPrice.forEach(({ price, code }) => {
//             finalPrice.push({ price: price * value.count, code });
//           });
//         }
//         return finalPrice;
//       })
//     );
//   }
// }
