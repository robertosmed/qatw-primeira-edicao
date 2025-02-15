export class dashPage{
    constructor(page){
        this.page = page;
    }

    async verificaSaldo() {
        return this.page.locator('#account-balance')
    }
}