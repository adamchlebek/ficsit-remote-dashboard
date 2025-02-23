import { gameItemsDictionary } from '../dictionaries/gameItems.dictionary';
import type { GameClassNamesEnum } from '../enums/gameClassNames.enum';

export const getImageHelper = (className: GameClassNamesEnum): string => {
    const item = gameItemsDictionary[className];

    if (!item) {
        return `/assets/Icon/notFound.png`;
    }

    return `/assets/${item.category}/${item.name}.png`;
};
