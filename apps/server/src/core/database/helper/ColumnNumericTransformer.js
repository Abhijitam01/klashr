import { Column } from 'typeorm';
export class ColumnNumericTransformer {
    to(data) {
        return data;
    }
    from(data) {
        return parseFloat(data);
    }
}
export function ColumnNumeric(options) {
    return function (target, propertyKey) {
        Column({
            ...options,
            type: 'numeric',
            transformer: new ColumnNumericTransformer(),
        })(target, propertyKey);
    };
}
