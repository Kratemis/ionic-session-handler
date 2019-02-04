export class article {

    constructor(
        public idArticle: number,
        public idProduct: number,
        public idUser: number,
        public idLanguage: number,
        public comments: string,
        public price: string,
        public count: number,
        public inShoppingCart: number,
        public enName: string,
        public locName: string,
        public image: string,
        public expansion: string,
        public nr: string,
        public expIcon: string,
        public rarity: string,
        public seller: string,
        public lastEdited: string,
        public condition: string,
        public isFoil: number,
        public isSigned: number,
        public isAltered: number,
        public isPlayset: number,
        public isFirstEd: number,
        public links: string,
        public downloaded: number,
        public toUpload: number

    ) {

    }
}
