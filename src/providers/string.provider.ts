export class StringProvider {
    //slug
    static slugify(name: string): string {
        return name
            .toLowerCase()
            .replace(/ /g, '-')
            .replace(/[^\w-]+/g, '');
    }
}
